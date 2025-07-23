const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');
const pool = require('../config/db');

// Registro de nuevo usuario
router.post('/register', register);

// Login de usuario
router.post('/login', login);

// Obtener usuario autenticado
router.get('/me', verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await pool.query(
      'SELECT id, nombre, email, role_id, departamento FROM usuarios WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuario', error: err.message });
  }
});

module.exports = router;
