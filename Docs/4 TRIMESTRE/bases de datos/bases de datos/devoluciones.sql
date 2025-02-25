create table devolucion(
id int not null auto_increment primary key,
numeroFactura varchar (40),
correo varchar (255),
nombre varchar (40),
telefono varchar (40),
productos varchar (200),
total double,
metodoPago varchar (40),
comentarios varchar (40)
);
