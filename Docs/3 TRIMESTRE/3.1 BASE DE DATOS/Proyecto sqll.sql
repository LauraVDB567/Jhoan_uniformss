
	create database proyecto;

	use proyecto;



	CREATE TABLE cliente (
		id INT AUTO_INCREMENT PRIMARY KEY,
		nombre VARCHAR(45) NOT NULL,
		apellido VARCHAR(40) NOT NULL,
		tipo_documento VARCHAR(25) NOT NULL,
		num_documento VARBINARY (25) NOT NULL, 
		telefono VARCHAR(15) NOT NULL,
		direccion VARCHAR(30) NOT NULL
	);

	CREATE TABLE empleado (
		id INT AUTO_INCREMENT PRIMARY KEY,
		nombre VARCHAR(100) NOT NULL,
		puesto VARCHAR(50),
		salario DECIMAL(10, 2),
		fecha_ingreso DATE
	);

	CREATE TABLE metodo_pago (
		id_metodopago INT AUTO_INCREMENT PRIMARY KEY,
		detalles_pago VARCHAR(50) NOT NULL,
		datos_necesarios VARCHAR(50) NOT NULL
	);


	CREATE TABLE proveedores (
		id INT AUTO_INCREMENT PRIMARY KEY,
		nombre VARCHAR(100) NOT NULL,
		productos_suministrados VARCHAR(255),
		telefono VARCHAR(15),
		condiciones_pago VARCHAR(100),
		tiempo_entrega VARCHAR (20) NOT NULL
	);

	CREATE TABLE transaccion (
		id INT AUTO_INCREMENT PRIMARY KEY,
		fecha_transaccion DATE NOT NULL,
		monto_total INT NOT NULL,
		estado_transaccion VARCHAR(20) NOT NULL,
		id_cliente INT,
		id_empleado INT,
		id_metodo_pago INT,
		FOREIGN KEY (id_cliente) REFERENCES cliente(id),
		FOREIGN KEY (id_empleado) REFERENCES empleado(id),
		FOREIGN KEY (id_metodo_pago) REFERENCES metodo_pago(id_metodopago)
	);

	CREATE TABLE uniformes (
		id INT AUTO_INCREMENT PRIMARY KEY,
		tipo VARCHAR(50) NOT NULL,
		talla VARCHAR(10) NOT NULL,
		color VARCHAR(30),
		cantidad INT NOT NULL,
		costo INT NOT NULL,
		id_proveedor INT,
		FOREIGN KEY (id_proveedor) REFERENCES proveedores(id)
	);


	CREATE TABLE devoluciones (
		id INT AUTO_INCREMENT PRIMARY KEY,
		id_transaccion INT NOT NULL,
		motivo_devolucion VARCHAR(200) NOT NULL,
		estado_devolucion VARCHAR(20) NOT NULL,
		fecha DATE NOT NULL,
		responsable_devolucion VARCHAR(20) NOT NULL,
		FOREIGN KEY (id_transaccion) REFERENCES transaccion(id)
	);
	-- INSERCIÓN DATOS--
	INSERT INTO cliente (nombre, apellido, tipo_documento, num_documento, telefono, direccion) VALUES
	('Miguel', 'Ángel', 'DNI', aes_encrypt('12345', 'AES'), '555-1234', 'Calle Falsa 123'),
	('Sara', 'Jiménez', 'DNI', aes_encrypt('12356', 'AES'), '555-5678', 'Avenida Siempre Viva 456'),
	('Javier', 'Fernández', 'DNI', aes_encrypt('56345', 'AES'), '555-9101', 'Calle del Sol 789'),
	('Patricia', 'Moreno', 'DNI', aes_encrypt('14545', 'AES'), '555-1122', 'Calle Luna 101'),
	('David', 'Ruiz', 'DNI', aes_encrypt('12675', 'AES'), '555-3344', 'Calle Estrella 202'),
	('Laura', 'Álvarez', 'DNI', aes_encrypt('96345', 'AES'), '555-5566', 'Calle Mar 303'),
	('Andrés', 'Sánchez', 'DNI', aes_encrypt('18045', 'AES'), '555-7788', 'Avenida del Mar 404'),
	('Elena', 'Castro', 'DNI', aes_encrypt('12349', 'AES'), '555-9900', 'Calle del Río 505'),
	('Carlos', 'Pérez', 'DNI', aes_encrypt('12389', 'AES'), '555-1235', 'Calle de la Paz 606'),
	('Nerea', 'Gómez', 'DNI', aes_encrypt('12575', 'AES'), '555-6789', 'Calle del Viento 707'),
	('Luis', 'Martínez', 'DNI', aes_encrypt('18765', 'AES'), '555-7890', 'Calle del Trueno 808'),
	('Ana', 'Ramos', 'DNI', aes_encrypt('19765', 'AES'), '555-8901', 'Calle del Fuego 909'),
	('Marcos', 'Ortiz', 'DNI', aes_encrypt('20765', 'AES'), '555-9012', 'Calle de la Brisa 1001'),
	('Sofía', 'Romero', 'DNI', aes_encrypt('21765', 'AES'), '555-0123', 'Avenida del Horizonte 1102'),
	('Pablo', 'Navarro', 'DNI', aes_encrypt('22765', 'AES'), '555-1236', 'Calle del Rayo 1203'),
	('Gabriela', 'Hernández', 'DNI', aes_encrypt('23765', 'AES'), '555-2345', 'Avenida de la Luz 1304'),
	('Ricardo', 'García', 'DNI', aes_encrypt('24765', 'AES'), '555-3456', 'Calle del Ocaso 1405'),
	('Clara', 'López', 'DNI', aes_encrypt('25765', 'AES'), '555-4567', 'Calle del Alba 1506');



	INSERT INTO empleado (nombre, puesto, salario, fecha_ingreso) VALUES
	('Juan Pérez', 'Vendedor', 2500.00, '2023-01-15'),
	('Ana Gómez', 'Gerente', 3500.00, '2022-03-01'),
	('Carlos López', 'Caja', 2000.00, '2023-06-15'),
	('Laura Martínez', 'Asistente', 2200.00, '2024-01-01'),
	('José Rodríguez', 'Vendedor', 2400.00, '2023-07-01'),
	('María Fernández', 'Gerente', 3600.00, '2022-05-15'),
	('Pedro Ramírez', 'Caja', 2100.00, '2023-09-01'),
	('Sofía Torres', 'Asistente', 2300.00, '2024-02-01'),
	('Luis García', 'Vendedor', 2600.00, '2023-10-01'),
	('Elena Morales', 'Gerente', 3700.00, '2022-11-01'),
	('Pablo Navarro', 'Vendedor', 2550.00, '2023-08-01'),
	('Gabriela Romero', 'Asistente', 2250.00, '2024-03-01'),
	('Miguel Herrera', 'Caja', 2150.00, '2023-11-01'),
	('Claudia Díaz', 'Vendedor', 2450.00, '2023-12-01'),
	('Ricardo Castillo', 'Gerente', 3550.00, '2022-04-01'),
	('Isabel Vega', 'Asistente', 2350.00, '2024-04-01'),
	('Manuel Silva', 'Vendedor', 2650.00, '2023-02-01'),
	('Andrea Cruz', 'Gerente', 3650.00, '2022-12-01');


	INSERT INTO metodo_pago (detalles_pago, datos_necesarios) VALUES
	('Efectivo', 'No se requiere información adicional'),
	('Tarjeta de Crédito', 'Número de tarjeta, fecha de vencimiento, CVV'),
	('Transferencia Bancaria', 'Número de cuenta, banco'),
	('Cheque', 'Número de cheque, banco'),
	('Pago Móvil', 'Número de teléfono, aplicación'),
	('PayPal', 'Email asociado'),
	('Efectivo', 'No se requiere información adicional'),
	('Tarjeta de Crédito', 'Número de tarjeta, fecha de vencimiento, CVV'),
	('Transferencia Bancaria', 'Número de cuenta, banco'),
	('Cheque', 'Número de cheque, banco'),
	('Pago Móvil', 'Número de teléfono, aplicación'),
	('PayPal', 'Email asociado'),
	('Tarjeta de Débito', 'Número de tarjeta, PIN'),
	('Gift Card', 'Código de tarjeta'),
	('Crédito en Tienda', 'Número de cuenta de cliente'),
	('Tarjeta de Débito', 'Número de tarjeta, PIN'),
	('Gift Card', 'Código de tarjeta'),
	('Crédito en Tienda', 'Número de cuenta de cliente');


	INSERT INTO proveedores (nombre, productos_suministrados, telefono, condiciones_pago, tiempo_entrega) VALUES
	('Juan Manuel', 'Pantalones', '555-2233', '30 días netos', '2 días'),
	('Alberto Lozada', 'Camisas', '555-4455', '60 días netos', '5 días'),
	('Juana Morales', 'Camisetas', '555-6677', '30 días netos', '1 día'),
	('Pedro Rujeles', 'Chalecos', '555-8899', '30 días netos', '3 días'),
	('María López', 'Zapatos', '555-1123', '15 días netos', '2 días'),
	('Lucía Londoño', 'Jardineras', '555-3345', '45 días netos', '7 días'),
	('Luisa Castillo', 'Sudaderas', '555-5567', '30 días netos', '4 días'),
	('Paula Pérez', 'Medias', '555-7789', '60 días netos', '3 días'),
	('Sebastián Coy', 'Chaquetas', '555-9901', '30 días netos', '2 días'),
	('Selene Murcia', 'Pantalonetas', '555-2234', '90 días netos', '10 días'),
	('Héctor Ramírez', 'Sombreros', '555-3344', '30 días netos', '4 días'),
	('Diana Torres', 'Guantes', '555-5566', '45 días netos', '5 días'),
	('Carmen García', 'Bufandas', '555-7788', '30 días netos', '3 días'),
	('Jorge Vallejo', 'Zapatos Deportivos', '555-9900', '15 días netos', '2 días'),
	('Carolina Fernández', 'Faldas', '555-2235', '60 días netos', '7 días'),
	('Daniel Gil', 'Cinturones', '555-4456', '30 días netos', '3 días'),
	('Patricia Herrera', 'Gorras', '555-6678', '90 días netos', '10 días'),
	('Ricardo Molina', 'Botas', '555-8890', '30 días netos', '2 días');


	INSERT INTO transaccion (fecha_transaccion, monto_total, estado_transaccion, id_cliente, id_empleado, id_metodo_pago) 
	VALUES
	('2024-05-12', 110, 'Completada', 11, 3, 1),
	('2024-05-20', 250, 'Pendiente', 12, 4, 2),
	('2024-06-01', 140, 'Cancelada', 13, 2, 3),
	('2024-06-05', 90, 'Completada', 14, 1, 1),
	('2024-06-10', 280, 'Pendiente', 15, 3, 2),
	('2024-06-15', 170, 'Completada', 16, 4, 3),
	('2024-07-01', 195, 'Completada', 17, 2, 1),
	('2024-07-10', 210, 'Pendiente', 18, 1, 2),
	('2024-07-15', 125, 'Completada', 1, 3, 3),
	('2024-08-01', 220, 'Cancelada', 2, 4, 1),
	('2024-08-05', 130, 'Completada', 3, 2, 2),
	('2024-08-12', 240, 'Pendiente', 4, 1, 3),
	('2024-08-20', 260, 'Completada', 5, 3, 1),
	('2024-09-01', 180, 'Cancelada', 6, 4, 2),
	('2024-09-10', 310, 'Pendiente', 7, 2, 3),
	('2024-09-15', 170, 'Completada', 8, 1, 1),
	('2024-10-01', 280, 'Cancelada', 9, 3, 2),
	('2024-10-05', 140, 'Pendiente', 10, 4, 3);



	INSERT INTO uniformes (tipo, talla, color, cantidad, costo) 
	VALUES
	('Chaqueta', 'L', 'Negro', 30, 60),
	('Camisa', 'S', 'Azul', 45, 18),
	('Pantalón', 'M', 'Gris', 50, 28),
	('Sombrero', 'S', 'Azul', 20, 8),
	('Zapatos', '43', 'Negro', 25, 42),
	('Chaqueta', 'M', 'Verde', 35, 58),
	('Camisa', 'L', 'Negro', 55, 22),
	('Pantalón', 'L', 'Azul', 40, 33),
	('Sombrero', 'M', 'Gris', 15, 9),
	('Zapatos', '41', 'Negro', 30, 38),
	('Camisa', 'M', 'Rojo', 50, 17),
	('Chaqueta', 'S', 'Blanco', 25, 52),
	('Pantalón', 'S', 'Negro', 45, 32),
	('Sombrero', 'L', 'Rojo', 10, 13),
	('Zapatos', '39', 'Marrón', 22, 36),
	('Camisa', 'L', 'Verde', 40, 21),
	('Chaqueta', 'M', 'Gris', 28, 57),
	('Pantalón', 'M', 'Blanco', 38, 29);


	INSERT INTO devoluciones (id_transaccion, motivo_devolucion, estado_devolucion, fecha, responsable_devolucion) 
	VALUES
	(1, 'Producto defectuoso', 'Procesada', '2024-06-01', 'Pablo Navarro'),
	(2, 'Cambio de talla', 'Pendiente', '2024-06-05', 'Gabriela Romero'),
	(3, 'Producto no deseado', 'Rechazada', '2024-06-10', 'Miguel Herrera'),
	(4, 'Error en el pedido', 'Procesada', '2024-06-15', 'Claudia Díaz'),
	(5, 'Producto dañado en el envío', 'Pendiente', '2024-07-01', 'Ricardo Castillo'),
	(6, 'Duplicado de pedido', 'Procesada', '2024-07-05', 'Isabel Vega'),
	(7, 'Insatisfacción con el producto', 'Rechazada', '2024-07-10', 'Manuel Silva'),
	(8, 'Cambio de color', 'Pendiente', '2024-07-15', 'Andrea Cruz'),
	(9, 'No coincide con la descripción', 'Procesada', '2024-08-01', 'Juan Pérez'),
	(10, 'Error en el precio', 'Rechazada', '2024-08-05', 'Ana Gómez'),
	(11, 'Producto defectuoso', 'Pendiente', '2024-08-10', 'Carlos López'),
	(12, 'Cambio de talla', 'Procesada', '2024-08-15', 'Laura Martínez'),
	(13, 'Producto no deseado', 'Rechazada', '2024-09-01', 'José Rodríguez'),
	(14, 'Error en el pedido', 'Pendiente', '2024-09-05', 'María Fernández'),
	(15, 'Producto dañado en el envío', 'Procesada', '2024-09-10', 'Pedro Ramírez'),
	(16, 'Duplicado de pedido', 'Rechazada', '2024-09-15', 'Sofía Torres'),
	(17, 'Insatisfacción con el producto', 'Pendiente', '2024-10-01', 'Luis García'),
	(18, 'Cambio de color', 'Procesada', '2024-10-05', 'Elena Morales'); 




    SELECT 
    t.id AS transaccion_id,
    t.fecha_transaccion,
    t.monto_total,
    t.estado_transaccion,
    c.nombre AS cliente_nombre,
    c.apellido AS cliente_apellido,
    e.nombre AS empleado_nombre,
    mp.detalles_pago AS metodo_pago
  FROM transaccion t
  JOIN cliente c ON t.id_cliente = c.id
  JOIN empleado e ON t.id_empleado = e.id
  JOIN metodo_pago mp ON t.id_metodo_pago = mp.id_metodopago;

 SELECT d.id AS devolucion_id,
    d.motivo_devolucion,
    d.estado_devolucion,
    d.fecha AS fecha_devolucion,
    t.monto_total,
    c.nombre AS cliente_nombre,
    c.apellido AS cliente_apellido,
    e.nombre AS responsable_nombre
FROM devoluciones d
JOIN transaccion t ON d.id_transaccion = t.id
JOIN cliente c ON t.id_cliente = c.id
JOIN empleado e ON d.responsable_devolucion = e.nombre;


   SELECT
    t.id AS transaccion_id,
    t.fecha_transaccion AS fecha,
    t.monto_total AS monto,
    c.nombre AS cliente_nombre,
    c.apellido AS cliente_apellido,
    e.nombre AS empleado_nombre,
    e.puesto AS empleado_puesto
   FROM transaccion t
   INNER JOIN cliente c ON t.id_cliente = c.id
   INNER JOIN empleado e ON t.id_empleado = e.id;


SELECT t.id AS transaccion_id, t.fecha_transaccion, t.monto_total, t.estado_transaccion,d.id 
AS devolucion_id, d.motivo_devolucion, d.estado_devolucion
FROM transaccion t
LEFT JOIN devoluciones d ON t.id = d.id_transaccion
ORDER BY t.fecha_transaccion;


SELECT
    t.id AS transaccion_id,
    t.fecha_transaccion AS fecha,
    t.monto_total AS monto,
    c.nombre AS cliente_nombre,
    c.apellido AS cliente_apellido,
    c.tipo_documento AS tipo_documento
FROM transaccion t
INNER JOIN cliente c ON t.id_cliente = c.id
WHERE c.tipo_documento = 'DNI';

SELECT
    e.id AS empleado_id,
    e.nombre AS empleado_nombre,
    e.puesto AS empleado_puesto,
    (SELECT AVG(t2.monto_total) FROM transaccion t2) AS promedio_monto_transacciones
FROM empleado e
WHERE e.id IN (
    SELECT t.id_empleado
    FROM transaccion t
    WHERE t.monto_total > (
        SELECT AVG(t2.monto_total)
        FROM transaccion t2
    )
);


	SELECT e.id AS empleado_id, e.nombre AS empleado_nombre, SUM(t.monto_total) AS total_monto
	FROM empleado e
	INNER JOIN transaccion t ON e.id = t.id_empleado
	WHERE t.estado_transaccion != 'Cancelada'
	GROUP BY e.id, e.nombre;


	SELECT e.id AS empleado_id, e.nombre AS empleado_nombre, t.id AS transaccion_id, t.monto_total
	FROM empleado e
	LEFT JOIN transaccion t ON e.id = t.id_empleado;


    SELECT
    c.nombre AS cliente_nombre,
    c.apellido AS cliente_apellido,
    t.monto_total AS monto
FROM cliente c
INNER JOIN transaccion t ON c.id = t.id_cliente
WHERE t.monto_total > 200;


	SELECT p.id AS proveedor_id, p.nombre AS proveedor_nombre, u.tipo AS uniforme_tipo
	FROM proveedores p
	LEFT JOIN uniformes u ON p.id = u.id;


	SELECT c.nombre AS cliente_nombre, c.apellido AS cliente_apellido, t.id AS transaccion_id, t.monto_total
	FROM cliente c
	LEFT JOIN transaccion t ON c.id = t.id_cliente;


SELECT id, fecha_transaccion, monto_total
FROM transaccion
WHERE id_cliente IN (SELECT id 
                   FROM cliente 
                   WHERE nombre LIKE 'A%') AND id_metodo_pago IN (SELECT id_metodo_pago 
                       FROM transaccion 
                       GROUP BY id_metodo_pago 
                       HAVING COUNT(*) > 1);

SELECT c.nombre, c.apellido, t.fecha_transaccion, t.monto_total, t.estado_transaccion
FROM cliente c
JOIN transaccion t ON c.id = t.id_cliente
WHERE c.id = (
    SELECT id_cliente 
    FROM transaccion 
    WHERE estado_transaccion = 'Pendiente' 
    GROUP BY id_cliente 
    ORDER BY COUNT(id_cliente) DESC 
    LIMIT 1)AND t.fecha_transaccion = (
    SELECT MAX(t2.fecha_transaccion)
    FROM transaccion t2
    WHERE t2.id_cliente = c.id)
    ORDER BY t.fecha_transaccion DESC;


                          

SELECT d.id AS devolucion_id, c.nombre AS cliente_nombre, c.apellido AS cliente_apellido, e.nombre AS empleado_nombre, m.detalles_pago, d.fecha, d.motivo_devolucion, d.estado_devolucion
FROM devoluciones d
JOIN transaccion t ON d.id_transaccion = t.id
JOIN cliente c ON t.id_cliente = c.id
JOIN empleado e ON t.id_empleado = e.id
JOIN metodo_pago m ON t.id_metodo_pago = m.id_metodopago
WHERE t.estado_transaccion = 'Completada'
AND d.estado_devolucion = 'Pendiente'
ORDER BY d.fecha DESC;

 SELECT c.nombre AS cliente_nombre, c.apellido AS cliente_apellido, t.fecha_transaccion,
 t.monto_total, t.estado_transaccion, d.motivo_devolucion, d.estado_devolucion
FROM cliente c
LEFT JOIN transaccion t ON c.id = t.id_cliente
LEFT JOIN devoluciones d ON t.id = d.id_transaccion
WHERE t.fecha_transaccion BETWEEN '2024-06-01' AND '2024-09-01'
ORDER BY c.apellido, t.fecha_transaccion;

-- seguridad 
create user "Valentina"@"localhost" identified by "123";
create user "Maximiliano"@"localhost" identified by "456";

create role "Caja";
create role "Gerente";

grant select, insert on proyecto.* to "Caja";
grant all privileges on proyecto.* to "Gerente";

grant "Caja" to "Valentina"@"localhost";
grant "Gerente" to "Maximiliano"@"localhost";

	









