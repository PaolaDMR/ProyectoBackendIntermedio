const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1', 
  user: 'root', 
  password: '', 
  database: 'registro'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL \n');
});

const API_endpoint = "http://localhost:3000/ubicacion";
fetch(API_endpoint)
  .then(response => response.json())
  .then(datosUbicacion => {
    console.log(datosUbicacion);
    const latitud = datosUbicacion.latitude;
    const longitud = datosUbicacion.longitude;
    HoraUbicacionUsuario(latitud, longitud);
    console.log(`Tus coordenadas son ${latitud}, ${longitud}`);
  })
  .catch(error => console.error('Error al obtener la ubicación:', error));


function HoraUbicacionUsuario(latitud, longitud) {
    const API_ENDPOINT = `https://api.timezonedb.com/v2.1/get-time-zone?key=T17YKDCVAI38&format=json&by=position&lat=${latitud}&lng=${longitud}`;
    
    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(data => {
        const hora = new Date(data.formatted);
        const fechaHora = data.formatted;
        console.log('\n La hora en tu ubicación es:', fechaHora);
        queryInsert(latitud, longitud, fechaHora);
      })
      .catch(error => {
        console.error('Error al obtener la hora:', error);
      });
  }

  function queryInsert(latitud, longitud, fechaHora){
    let sql = `INSERT INTO Horas (latitud, longitud, fechahora) VALUES (${latitud}, ${longitud}, '${fechaHora}')`;

      // Consulta
    connection.query('SELECT * FROM Horas', (error, results, fields) => {
        if (error) {
        console.error('\n Error al realizar la consulta:', error);
        return;
        }
        console.log('\n Resultados de la consulta:', results);
    });
  }




