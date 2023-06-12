import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pkg;

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
};

const client = new Client(config);
client.connect((err) => {
  if (err) {
    console.error('Hubo algun error en la conexion: ', err.stack);
  } else {
    console.log('Conectado a la base de datos');
  }
});

export default client;
