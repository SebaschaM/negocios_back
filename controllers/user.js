import { UserService } from '../services/index.js';

class AuthController {
  constructor() {
    this.userService = new UserService();
  }

  login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await this.userService.login(email, password);
      return res.json(user);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  };

  register = async (req, res) => {
    const { fullname, email, password, phone } = req.body;

    try {
      const newUser = await this.userService.register(fullname, email, password, phone);
      return res.json(newUser);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // profile = async (req, res) => {
  //   const id = req.id;
  //   const email = req.email;

  //   try {
  //     const user = await this.userService.findEmail(email);
  //     if (!user) {
  //       return res.status(401).json({ message: 'Usuario no encontrado' });
  //     }

  //     return res.json({ id: id, email: email, fullname: user.fullname, phone: user.phone });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(401).json({ message: error.message });
  //   }
  // };

  updateProfile = async (req, res) => {
    const id = req.params.idClient;
    const body = req.body;
    const email = req.email;

    try {
      const updatedUser = await this.userService.updateProfile(id, body);
      if (!updatedUser) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }
      await this.userService.findEmail(email);
      return res.json({ message: 'User update' });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: error.message });
    }
  };

  getProfile = async (req, res) => {
    const idClient = req.params.idClient;

    try {
      const user = await this.userService.getProfile(idClient);
      if (!user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: error.message });
    }
  };
}

export default AuthController;
