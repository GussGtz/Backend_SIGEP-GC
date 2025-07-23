const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// === Middlewares globales ===
app.use(cors());
app.use(express.json());

// ✅ Ruta raíz para verificar estado del backend
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '✅ Backend SIGEP-GC activo y funcionando en Render 🚀',
  });
});

// === Rutas principales ===
const authRoutes = require('./routes/auth');
const pedidoRoutes = require('./routes/pedidos');

// === Montaje de rutas con prefijo /api ===
app.use('/api/auth', authRoutes);
app.use('/api/pedidos', pedidoRoutes);

// === Puerto de escucha ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
