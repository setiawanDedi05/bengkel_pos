import AuthService from '../services/authService.js';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */
const AuthController = {
  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Login
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login successful
   *       400:
   *         description: Invalid credentials
   */
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const result = await AuthService.login({ username, password });
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};

export default AuthController;
