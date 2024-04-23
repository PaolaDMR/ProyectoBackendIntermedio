CREATE DATABASE libros

CREATE TABLE Autores (
    id_Autor INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(200),
    Apellidos VARCHAR(200)
);

CREATE TABLE Libros (
    id_Libro INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(200),
    Paginas REAL,
    Fecha_publicacion DATE,
    Editorial VARCHAR(300),
    id_Autor INT,
    FOREIGN KEY (id_Autor) REFERENCES Autores(id_Autor)
);