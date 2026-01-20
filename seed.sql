-- Clean up
TRUNCATE TABLE "OrderItem", "Order", "ProductImage", "ProductVideo", "Product", "Category" CASCADE;

-- Categories
INSERT INTO "Category" (id, name, slug, description, "updatedAt") 
VALUES 
('cat_rep', 'Reproductores', 'reproductores', 'Cuyes de alta genética para reproducción.', NOW()),
('cat_ali', 'Alimento', 'alimento', 'Alimento balanceado para todas las etapas.', NOW()),
('cat_acc', 'Accesorios', 'accesorios', 'Equipamiento para tu granja.', NOW()),
('cat_med', 'Medicamentos', 'medicamentos', 'Salud y prevención para tus cuyes.', NOW());

-- Products
INSERT INTO "Product" (id, name, slug, description, type, price, "requiresCoordination", "manageInventory", "stockQuantity", "technicalData", status, "categoryId", "updatedAt")
VALUES
('prod_h_rep_com', 'Hembra Reproductora - Línea Comercial', 'hembra-reproductora-comercial', 'Hembra de 600g ideal para iniciar producción comercial. Excelente prolificidad.', 'REPRODUCTOR_COMERCIAL', 50.00, true, true, 100, '{"peso": "600g", "edad": "3 meses", "linea": "Perú"}'::jsonb, 'active', 'cat_rep', NOW()),
('prod_m_alf_pre', 'Macho Alfa Premium - Línea Inti', 'macho-alfa-premium-inti', 'Ejemplar sobresaliente con características genéticas superiores. Cabeza ancha y gran profundidad.', 'REPRODUCTOR_PREMIUM', 150.00, true, false, 0, '{"peso": "1.2kg", "edad": "5 meses", "linea": "Inti", "caracteristicas": "Elite"}'::jsonb, 'active', 'cat_rep', NOW()),
('prod_ali_eng_40', 'Saco Alimento Balanceado - Engorde 40kg', 'alimento-engorde-40kg', 'Fórmula optimizada para el crecimiento rápido y saludable.', 'ALIMENTO', 85.00, true, true, 50, null, 'active', 'cat_ali', NOW()),
('prod_com_cer', 'Comedero Cerámico Pesado', 'comedero-ceramico', 'Evita desperdicios. Fácil de limpiar y muy resistente.', 'ACCESORIO', 15.00, false, true, 200, null, 'active', 'cat_acc', NOW());

-- Images
INSERT INTO "ProductImage" (id, "productId", url, "isPrimary")
VALUES
('img_1', 'prod_h_rep_com', 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=400', true),
('img_2', 'prod_m_alf_pre', 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&q=80&w=400', true),
('img_3', 'prod_m_alf_pre', 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=400', false),
('img_4', 'prod_ali_eng_40', 'https://images.unsplash.com/photo-1545143333-e8bd3346e9d6?auto=format&fit=crop&q=80&w=400', true),
('img_5', 'prod_com_cer', 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=400', true);
