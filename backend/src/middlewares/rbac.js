import User from '../models/User.js';

export default function rbac(roles = []) {
  // roles param can be a single role string or array of roles
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return [
    async (req, res, next) => {
      // Assume req.user is set after authentication
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: insufficient role' });
      }
      next();
    },
  ];
}
