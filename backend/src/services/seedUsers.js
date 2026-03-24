import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export async function seedAdminAndCashier() {
  const adminExists = await User.findOne({ where: { username: 'admin' } });
  if (!adminExists) {
    await User.create({
      fullName: 'Administrator',
      email: 'admin@bengkel.local',
      username: 'admin',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
    });
  }
  const cashierExists = await User.findOne({ where: { username: 'cashier' } });
  if (!cashierExists) {
    await User.create({
      fullName: 'Cashier',
      email: 'cashier@bengkel.local',
      username: 'cashier',
      password: await bcrypt.hash('cashier123', 10),
      role: 'cashier',
    });
  }
}
