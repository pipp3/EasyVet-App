import { Sequelize } from 'sequelize'; // Importar Sequelize
import dotenv from 'dotenv'; // Importar dotenv

dotenv.config(); // Cargar las variables de entorno

// Crear una instancia de Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
});

// Probar la conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos ha sido establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

testConnection();

// Exportar la instancia de sequelize
export default sequelize;