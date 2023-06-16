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
      const query = 'SELECT * FROM client WHERE email = $1';
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
      const query = 'UPDATE user SET ? WHERE id = ?';
      const result = await client.query(query, [body, id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async register(fullname, email, password, phone) {
    try {
      const existingUser = await this.findEmail(email);

      if (existingUser) {
        throw new Error(`El email ${email} ya está registrado`);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = 'INSERT INTO client (fullname, email, password, phone) VALUES ($1, $2, $3, $4)';
      await client.query(query, [fullname, email, hashedPassword, phone]);

      const newUser = {
        fullname: fullname,
        email: email,
        password: hashedPassword,
        phone: phone,
      };

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getProfile(idClient) {
    try {
      const query = 'SELECT * FROM client WHERE "idClient" = $1';
      const result = await client.query(query, [idClient]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
