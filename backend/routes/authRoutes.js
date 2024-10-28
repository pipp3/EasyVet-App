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
          { expiresIn: "10m" }
        );
        const confirmLink = `http://localhost:3000/confirm-account/${confirmToken}`;
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
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const isMatch = await user.validPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }
    const token = jwt.sign(
      { id: user.id, nombres: user.nombres, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );
    res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el login" });
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
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    await sendEmail(
      user.email,
      "Restablecer tu contraseña",
      `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`
    );
    res.json({
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    user.confirmado = true;
    await user.save();
    res.json({ message: "Cuenta confirmada con éxito" });
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "El token ha expirado" });
    }
    res.status(500).json({ message: "Error al confirmar la cuenta" });
  }
});

export default router;
