-- Script para insertar todos los productos en la base de datos
-- Base de datos: Voltaje Moda
-- Tabla: productos

-- ========================================
-- VESTIDOS (IDs: 1-6)
-- ========================================
INSERT INTO productos (id, nombre, descripcion, precio, categoria, imagen, etiqueta, color, stock) VALUES
(1, 'Vestido corto cinturon', 'Vestido corto elegante con cinturón', 120000, 'Vestidos', 'public/images/Vestido-Corto-Cinturon.jpeg', NULL, NULL, 10),
(2, 'Vestido cinturon', 'Vestido con cinturón', 59900, 'Vestidos', 'public/images/VestidoCinturon.jpeg', NULL, NULL, 10),
(3, 'Vestido abierto', 'Vestido largo abierto', 29990, 'Vestidos', 'public/images/Vestido-Largo-Abierto.jpeg', 'oferta', NULL, 10),
(4, 'Vestido corto', 'Vestido corto con mangas', 35000, 'Vestidos', 'public/images/Vestido-Corto-Mangas.jpeg', NULL, NULL, 10),
(5, 'Vestido mangas', 'Vestido con mangas largas', 86000, 'Vestidos', 'public/images/VestidoMangas.jpeg', NULL, NULL, 10),
(6, 'Vestido floral', 'Vestido con estampado floral', 55000, 'Vestidos', 'public/images/VestidoFloral.jpeg', NULL, NULL, 10);

-- ========================================
-- PRENDAS INFERIORES (IDs: 101-103)
-- ========================================
INSERT INTO productos (id, nombre, descripcion, precio, categoria, imagen, etiqueta, color, stock) VALUES
(101, 'Pantalon con cinturon', 'Pantalón elegante con cinturón incluido', 120000, 'Prendas Inferiores', 'public/images/PantalonCinturon.jpeg', NULL, NULL, 10),
(102, 'Pantalon cuadros', 'Pantalón a cuadros casual', 59900, 'Prendas Inferiores', 'public/images/PantalonCuadros.jpeg', NULL, NULL, 10),
(103, 'Pantalon deportivo', 'Pantalón cómodo estilo deportivo', 29990, 'Prendas Inferiores', 'public/images/PantalonDeportivo.jpeg', 'oferta', NULL, 10);

-- ========================================
-- ENTERIZOS (IDs: 201-202)
-- ========================================
INSERT INTO productos (id, nombre, descripcion, precio, categoria, imagen, etiqueta, color, stock) VALUES
(201, 'Enterizo floral', 'Enterizo con estampado floral elegante', 120000, 'Enterizos', 'public/images/EnterizoFloral.jpeg', NULL, NULL, 10),
(202, 'Enterizo cinturon', 'Enterizo con cinturón ajustable', 59900, 'Enterizos', 'public/images/EnterizoCinturon.jpeg', NULL, NULL, 10);

-- ========================================
-- CONJUNTOS (IDs: 301-307)
-- ========================================
INSERT INTO productos (id, nombre, descripcion, precio, categoria, imagen, etiqueta, color, stock) VALUES
(301, 'Conjunto bandeja', 'Conjunto de dos piezas estilo bandeja', 59900, 'Conjuntos', 'public/images/ConjuntoBandeja.jpeg', NULL, NULL, 10),
(302, 'Conjunto falda y top', 'Conjunto elegante de falda y top', 29990, 'Conjuntos', 'public/images/Conjunto-Falda-Top.jpeg', 'oferta', NULL, 10),
(303, 'Conjunto moños', 'Conjunto decorado con moños', 35000, 'Conjuntos', 'public/images/Conjunto-Moños.jpeg', NULL, NULL, 10),
(304, 'Conjunto top', 'Conjunto moderno con top', 86000, 'Conjuntos', 'public/images/ConjuntoTop.jpeg', NULL, NULL, 10),
(305, 'Conjunto short', 'Conjunto casual con short', 86000, 'Conjuntos', 'public/images/ConjuntoShort.jpeg', NULL, NULL, 10),
(306, 'Conjunto mandalas', 'Conjunto con estampado de mandalas', 86000, 'Conjuntos', 'public/images/ConjuntoMandalas.jpeg', NULL, NULL, 10),
(307, 'Conjunto blusa abierta y short', 'Conjunto de blusa abierta con short', 86000, 'Conjuntos', 'public/images/Conjunto-Blusa-Abierta.jpeg', NULL, NULL, 10);

-- ========================================
-- PRENDAS SUPERIORES / BLUSAS (IDs: 401-414)
-- ========================================
INSERT INTO productos (id, nombre, descripcion, precio, categoria, imagen, etiqueta, color, stock) VALUES
(401, 'Blusa puntos', 'Blusa con estampado de puntos', 120000, 'Prendas Superiores', 'public/images/BlusaPuntos.jpeg', NULL, NULL, 10),
(402, 'Blusa flores', 'Blusa larga con estampado floral', 59900, 'Prendas Superiores', 'public/images/Blusa-Larga-Flores.jpeg', NULL, NULL, 10),
(403, 'Blusa tipo vaca', 'Blusa con estampado de vaca', 29990, 'Prendas Superiores', 'public/images/BlusaVaca.jpeg', 'oferta', NULL, 10),
(404, 'Blusa resortada', 'Blusa con elástico resortado', 35000, 'Prendas Superiores', 'public/images/BlusaResortada.jpeg', NULL, NULL, 10),
(405, 'Camisa rayas', 'Camisa elegante a rayas', 85000, 'Prendas Superiores', 'public/images/CamisaRayas.jpeg', NULL, NULL, 10),
(406, 'Blusa corta', 'Blusa corta moderna', 89000, 'Prendas Superiores', 'public/images/BlusaCorta.jpeg', NULL, NULL, 10),
(407, 'Blusa pepitas', 'Blusa con estampado de pepitas', 29900, 'Prendas Superiores', 'public/images/Blusa-Corta-Pepitas.jpeg', 'oferta', NULL, 10),
(408, 'Top straple', 'Top sin tirantes estilo straple', 80000, 'Prendas Superiores', 'public/images/TopStraple.jpeg', NULL, NULL, 10),
(409, 'Blusa oversize', 'Blusa estilo oversize cómoda', 78000, 'Prendas Superiores', 'public/images/BlusaOversize.jpeg', NULL, NULL, 10),
(410, 'Blusa moños', 'Blusa decorada con moños en polo', 66000, 'Prendas Superiores', 'public/images/Blusa-Moño-Polo.jpeg', NULL, NULL, 10),
(411, 'Blusa bandeja', 'Blusa estilo bandeja con rayas', 51000, 'Prendas Superiores', 'public/images/Blusa-Bandeja-Rayas.jpeg', NULL, NULL, 10),
(412, 'Blusa straple moños', 'Blusa straple decorada con moños', 45500, 'Prendas Superiores', 'public/images/Blusa-Straple-Moños.jpeg', NULL, NULL, 10),
(413, 'Blusa corta moños', 'Blusa corta con detalles de moños', 82900, 'Prendas Superiores', 'public/images/Blusa-Corta-Moños.jpeg', NULL, NULL, 10),
(414, 'Blusa cisa puntos', 'Blusa cisa con estampado de puntos', 92000, 'Prendas Superiores', 'public/images/Blusa-Cisa-Puntos.jpeg', NULL, NULL, 10);

-- ========================================
-- OFERTAS DESTACADAS (IDs: 501-505)
-- ========================================
INSERT INTO productos (id, nombre, descripcion, precio, categoria, imagen, etiqueta, color, stock) VALUES
(501, 'Blusa Pepitas', 'Blusa corta con estampado de pepitas - OFERTA', 29990, 'Prendas Superiores', 'public/images/Blusa-Corta-Pepitas.jpeg', 'nuevo', NULL, 10),
(502, 'Conjunto Bandeja', 'Conjunto elegante estilo bandeja - OFERTA', 96000, 'Conjuntos', 'public/images/ConjuntoBandeja.jpeg', 'oferta', NULL, 10),
(503, 'Vestido abierto', 'Vestido largo abierto - OFERTA', 42500, 'Vestidos', 'public/images/Vestido-Largo-Abierto.jpeg', 'oferta', NULL, 10),
(504, 'Vestido cinturon', 'Vestido elegante con cinturón - OFERTA', 35910, 'Vestidos', 'public/images/VestidoCinturon.jpeg', 'oferta', NULL, 10),
(505, 'Top Straple', 'Top sin tirantes estilo straple - OFERTA', 45000, 'Prendas Superiores', 'public/images/TopStraple.jpeg', 'oferta', NULL, 10);

-- ========================================
-- RESUMEN DE PRODUCTOS
-- ========================================
-- Total de productos: 37
-- Vestidos: 6 productos
-- Prendas Inferiores: 3 productos
-- Enterizos: 2 productos
-- Conjuntos: 7 productos
-- Prendas Superiores: 14 productos
-- Ofertas Destacadas: 5 productos (pueden repetirse con otras categorías)

-- NOTA: Los productos de "New" (Nuevo) vienen del backend, no están incluidos aquí
-- NOTA: Algunos IDs de ofertas destacadas (501-505) pueden duplicarse con productos existentes
-- Si ya existen productos con esos IDs, considera cambiar los IDs o eliminar duplicados
