const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

// Leer archivo SQL
const sqlScript = fs.readFileSync('./sql/basedatos.sql', 'utf8');

// Crear conexión
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

// Ejecutar script
connection.query(sqlScript, (err, results) => {
  if (err) {
    console.error('❌ Error al importar la base de datos:', err);
  } else {
    console.log('✅ Base de datos importada correctamente.');
  }
  connection.end();
});
