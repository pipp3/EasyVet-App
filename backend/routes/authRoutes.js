import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/User.js"

const router = Router();

router.post("/register", async (req, res) => {
    const { nombres, apellidos, email, password, celular } = req.body;
    try {
        const userExits = await User.findOne({ where: { email } });
        if(userExits) {
            return res.status(400).json({ message: "Este email ya existe en nuestro sistema" });
        }
        const newUser = await User.create({ nombres, apellidos, email, password, celular });
        return res.status(201).json({message: "Usuario creado con éxito"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el registro" });
    }
});

export default router;