import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const AuthService = {
  async login({ username, password }) {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error('Invalid username or password');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid username or password');
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    return { token, user: { id: user.id, username: user.username, role: user.role } };
  },
};

export default AuthService;
