import bcrypt from 'bcrypt';
import client from '../config/connectionDB.js';

class UserService {
  constructor() {}

  async login(email, password) {
    const user = await this.findEmail(email);
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (password === user.password || passwordMatch) {
        return user;
      } else {
        throw new Error('Contraseña incorrecta');
      }
    } else {
      throw new Error(`No se encontró ningún usuario con el email ${email}`);
    }
  }

  async findEmail(email) {
    try {
      const query = 'SELECT * FROM "user" WHERE email = $1';
      const user = await client.query(query, [email]);

      if (user.rows.length === 0) {
        return null;
      }

      return user.rows[0];
    } catch (error) {
      console.error(`Error al obtener el usuario con email ${email}: `, error);
      throw error;
    }
  }

  async updateProfile(id, body) {
    try {
      const { password } = body;
      if (password) {
        body.password = await bcrypt.hash(password, 10);
      }
      const query = 'UPDATE "user" SET fullname=$1, email=$2, password=$3, phone=$4 WHERE "idUser"=$5';
      const values = [body.fullname, body.email, body.password, body.phone, id];
      const result = await client.query(query, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async register(fullname, dni, email, password, phone) {
    try {
      const existingUser = await this.findEmail(email);
      if (existingUser) {
        throw new Error(`El email ${email} ya está registrado`);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const query = 'INSERT INTO "user" (fullname, dni_ruc, email, password, phone, address, role) VALUES ($1, $2, $3, $4, $5, \'\', 0)';
      await client.query(query, [fullname, dni, email, hashedPassword, phone]);
      const newUser = {
        fullname: fullname,
        dni: dni,
        email: email,
        password: hashedPassword,
        phone: phone,
      };

      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async getProfile(idClient) {
    try {
      const query = 'SELECT * FROM "user WHERE "idUser" = $1';
      const result = await client.query(query, [idClient]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
