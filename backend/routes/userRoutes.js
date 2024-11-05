import { Router } from "express";
import User from "../models/User.js";
import dotenv from "dotenv";
import authMiddleware from "../utils/middleware.js";

const router = Router();
dotenv.config();

router.get("/me", authMiddleware, (req, res) => {
  const { id, nombres, email, rol } = req.user;
  res.json({ success: true, user: { id, nombres, email, rol } });
});

router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id); // Usamos `req.user.id` del token
    
        if (!user) {
          return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
    
        res.json({
          id: user.id,
          nombres: user.nombres,
          apellidos: user.apellidos,
          email: user.email,
          // Puedes añadir otros campos necesarios para el perfil
        });
      } catch (error) {
        console.error("Error en /profile:", error);
        res.status(500).json({ success: false, message: 'Error en la petición' });
      }
});

export default router;
