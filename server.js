const express = require('express');

const app = express();
const port = 3000;

app.get('/ubicacion', async (req, res) => {
  try {
    const response = await fetch('https://freegeoip.app/json/');
    const datosUbicacion = await response.json();
    res.json(datosUbicacion);
  } catch (error) {
    console.error('Error al obtener la ubicación:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener la ubicación' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});