import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { sendEmail } from "../config/mailer.js";

dotenv.config();
const router = Router();

router.post("/register", async (req, res) => {
  const { nombres, apellidos, email, password, celular } = req.body;
  try {
    const userExits = await User.findOne({ where: { email } });
    if (userExits) {
      return res
        .status(400)
        .json({ message: "Este email ya existe en nuestro sistema" });
    }
    const newUser = await User.create({
      nombres,
      apellidos,
      email,
      password,
      celular,
    });
    if (newUser) {
      try {
        const confirmToken = jwt.sign(
          {
            id: newUser.id,
            nombres: newUser.nombres,
            email: newUser.email,
            rol: newUser.rol,
          },
          process.env.JWT_SECRET,
          { expiresIn: "120m" }
        );
        const confirmLink = `http://localhost:5173/confirm-account/${confirmToken}`;
        await sendEmail(
          newUser.email,
          "Confirma tu cuenta",
          `Haz clic en el siguiente enlace para confirmar tu cuenta: ${confirmLink}`
        );
        res.json({
          message: "Se ha enviado un email para confirmar tu cuenta",
        });
      } catch (error) {
        res
        .status(500)
        .json({ message: "Error en el envío del correo de confirmación." });
      }
    }
    return res.status(201).json({ message: "Usuario creado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el registro" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verificamos si el usuario existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, message: "Credenciales inválidas" });
    }

    // Verificamos si la contraseña es correcta
    const isMatch = await user.validPassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Credenciales inválidas" });
    }

    // Generamos el JWT con los datos del usuario
    const token = jwt.sign(
      { id: user.id, nombres: user.nombres, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Respondemos con éxito y el token
    res.json({ success: true, message: "Login exitoso", token });
  } catch (error) {
    // Error en el servidor
    console.error("Error en login:", error);
    res.status(500).json({ success: false, message: "Error en el servidor. Inténtalo más tarde." });
  }
});
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const resetToken = jwt.sign(
      { id: user.id, nombres: user.nombres, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );
    const resetLink = `http://localhost:5173/change-password/${resetToken}`;
    await sendEmail(
      user.email,
      "Restablecer tu contraseña",
      `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`
    );
    res
    .status(201)
    .json({
      message: "Se ha enviado un email para restablecer tu contraseña",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error en el envío del correo de recuperación." });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "El token ha expirado" });
    }
    res.status(500).json({ message: "Error al restablecer la contraseña" });
  }
});



router.post("/confirm-account/:token", async (req, res) => {
  const { token } = req.params;
  try {
    // Verifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Busca al usuario en la base de datos
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      // Si no se encuentra el usuario, envía una respuesta y termina la ejecución
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    // Marca la cuenta como confirmada y guarda los cambios
    user.confirmado = true;
    await user.save();
    
    // Envía la respuesta de éxito
    return res.json({ message: "Cuenta confirmada con éxito" }); // Asegúrate de usar return aquí
  } catch (error) {
    console.error(error);
    
    // Maneja errores específicos
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "El token ha expirado" }); // Retorna aquí también
    }
    
    // Respuesta de error genérica
    return res.status(500).json({ message: "Error al confirmar la cuenta" }); // Usa return
  }
});


export default router;
