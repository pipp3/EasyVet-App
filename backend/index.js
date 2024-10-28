import express from 'express'; // Importar express
import bodyParser from 'body-parser'; // Importar body-parser
import  sequalize  from './config/conn.js'; // Importar la función query desde el módulo db
import dotenv from 'dotenv'; // Importar dotenv
import passport from 'passport';
import cors from 'cors';
import jwtStrategy from './config/passport.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: 'http://localhost:5173',
}));

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(bodyParser.json());
//Iniciar la configuración de passport y jwt
passport.use(jwtStrategy);
app.use(passport.initialize());

sequalize.sync()
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

app.use('/api/auth', authRoutes);

// Inicializar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

