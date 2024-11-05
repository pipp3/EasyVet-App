import express from 'express'; // Importar express
import bodyParser from 'body-parser'; // Importar body-parser
import  sequalize  from './config/conn.js'; // Importar la función query desde el módulo db
import dotenv from 'dotenv'; // Importar dotenv

import cors from 'cors';

import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config(); // Cargar variables de entorno

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(bodyParser.json());


sequalize.sync()
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Inicializar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

