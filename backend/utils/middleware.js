import jwt from 'jsonwebtoken';

export default function  authMiddleware (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "No autorizado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agrega los datos del usuario decodificados a `req.user`
    next(); // Continúa con la siguiente función
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token inválido o expirado" });
  }
};
