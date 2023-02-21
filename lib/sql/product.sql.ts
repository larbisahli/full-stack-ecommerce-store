// **** products ****

export function getProducts(): string {
  return ``;
}

export function getProduct(): string {
  return `SELECT pd.id, pd.slug, pd.product_name AS "name", pd.sale_price AS "salePrice", 
  pd.compare_price AS "comparePrice", pd.disable_out_of_stock AS "disableOutOfStock", 
  pd.quantity, pd.short_description AS "shortDescription", pd.product_description AS "description", jsonb_build_object('id', pd.product_type) AS "type",

  (SELECT json_build_object('id', galt.id, 'image', galt.image) FROM gallery galt WHERE galt.product_id = pd.id AND galt.is_thumbnail = true) AS "thumbnail",
  ARRAY(SELECT json_build_object('id', galg.id, 'image', galg.image) FROM gallery galg WHERE galg.product_id = pd.id ORDER BY galg.is_thumbnail DESC) AS "gallery",

  ARRAY(SELECT json_build_object('id', vo.id, 'title', vo.title, 'image', (SELECT img.image FROM gallery img WHERE img.id = vo.image_id), 'salePrice', vo.sale_price, 
								 'comparePrice', vo.compare_price, 'quantity', vo.quantity,
                 'options', ARRAY(SELECT pav.attribute_value_id FROM product_attribute_values pav WHERE pav.id IN 
                 (SELECT vv.product_attribute_value_id FROM variant_values vv WHERE vv.variant_id = (SELECT v.id FROM variants v WHERE v.variant_option_id = vo.id)))) 
                 FROM variant_options vo WHERE vo.id IN (SELECT v.variant_option_id FROM variants v WHERE v.product_id = pd.id)) AS "variationOptions",

  ARRAY(SELECT json_build_object('attribute', json_build_object('id', pa.attribute_id, 'name', (SELECT att.attribute_name FROM attributes att WHERE att.id = pa.attribute_id)), 
  'values', ARRAY(SELECT json_build_object('id', pav.attribute_value_id, 'value', (SELECT att_v.attribute_value FROM attribute_values att_v WHERE att_v.id = pav.attribute_value_id), 
  'color', (SELECT att_v.color FROM attribute_values att_v WHERE att_v.id = pav.attribute_value_id)) 
  FROM product_attribute_values pav WHERE pav.product_attribute_id = pa.id)) 
  FROM product_attributes pa WHERE pa.product_id = pd.id) AS "variations" FROM products AS pd WHERE pd.slug = $1`;
}

export function getProductForAdmin(): string {
  return `SELECT pd.id, pd.product_name AS "name", pd.sale_price AS "salePrice", pd.buying_price AS buyingPrice, pd.compare_price AS "comparePrice", 
  pd.disable_out_of_stock AS "disableOutOfStock", pd.quantity, pd.published, pd.created_at AS "createdAt", pd.updated_at AS "updatedAt", pd.note, 
  pd.product_description AS "description", pd.short_description AS "shortDescription", pd.sku, jsonb_build_object('id', pd.product_type) AS "type",

  (SELECT json_build_object('id', galt.id, 'image', galt.image) FROM gallery galt WHERE galt.product_id = pd.id AND galt.is_thumbnail = true) AS thumbnail,
  ARRAY(SELECT json_build_object('id', galg.id, 'image', galg.image) FROM gallery galg WHERE galg.product_id = pd.id AND galg.is_thumbnail = false) AS gallery,

  ARRAY(SELECT json_build_object('id', cate.id, 'name', cate.name) FROM categories cate WHERE cate.id IN (SELECT pc.category_id FROM product_categories pc WHERE pc.product_id = pd.id)) AS "categories",

  ARRAY(SELECT json_build_object('id', vo.id, 'title', vo.title, 'image', (SELECT img.image FROM gallery img WHERE img.id = vo.image_id), 'salePrice', vo.sale_price, 
								 'comparePrice', vo.compare_price, 'buyingPrice', vo.buying_price, 
								 'quantity', vo.quantity, 'sku', vo.sku, 'isDisable', NOT(vo.active),
                 'options', ARRAY(SELECT pav.attribute_value_id FROM product_attribute_values pav WHERE pav.id IN (SELECT vv.product_attribute_value_id 
                  FROM variant_values vv WHERE vv.variant_id = (SELECT v.id FROM variants v WHERE v.variant_option_id = vo.id)))) FROM variant_options vo WHERE vo.id 
                  IN (SELECT v.variant_option_id FROM variants v WHERE v.product_id = pd.id)) AS "variationOptions",

  ARRAY(SELECT json_build_object('attribute', json_build_object('id', pa.attribute_id, 'name', (SELECT att.attribute_name FROM attributes att WHERE att.id = pa.attribute_id)), 
  'selectedValues', ARRAY(SELECT json_build_object('id', pav.attribute_value_id, 'value', (SELECT att_v.attribute_value 
  FROM attribute_values att_v WHERE att_v.id = pav.attribute_value_id)) FROM product_attribute_values pav WHERE pav.product_attribute_id = pa.id)) 
  FROM product_attributes pa WHERE pa.product_id = pd.id) AS "variations"
  FROM products AS pd WHERE pd.id = $1`;
}

export function getProductsForAdmin(): string {
  return `SELECT pd.id, pd.product_name AS name, jsonb_build_object('id', pd.product_type) AS type, pd.published, pd.created_at AS "createdAt",

  CASE
    WHEN pd.product_type = 'simple' THEN pd.quantity
    WHEN pd.product_type = 'variable' THEN (SELECT SUM(vp.quantity)
    FROM variant_options vp WHERE vp.product_id = pd.id AND vp.active IS TRUE) END AS "quantity",

  CASE WHEN pd.product_type = 'variable' THEN (SELECT MAX(vp.sale_price) FROM variant_options vp WHERE vp.product_id = pd.id AND vp.active IS TRUE) END AS "maxPrice",
  CASE WHEN pd.product_type = 'variable' THEN (SELECT MIN(vp.sale_price) FROM variant_options vp WHERE vp.product_id = pd.id AND vp.active IS TRUE) END AS "minPrice",
  CASE WHEN pd.product_type = 'simple' THEN pd.sale_price END AS "salePrice",

  (SELECT gal.image FROM gallery AS gal WHERE gal.product_id = pd.id AND gal.is_thumbnail = true) AS thumbnail,
  ARRAY(SELECT json_build_object('id', cate.id, 'name', cate.name) FROM categories cate WHERE cate.id IN (SELECT pc.category_id FROM product_categories pc WHERE pc.product_id = pd.id)) AS categories,

  (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name) FROM staff_accounts AS stc WHERE stc.id = pd.created_by) AS "createdBy",
  (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name) FROM staff_accounts AS stu WHERE stu.id = pd.updated_by) AS "updatedBy"
  FROM products AS pd order by pd.created_at DESC LIMIT $1 OFFSET $2`;
}

export function getProductsCount(): string {
  return `SELECT count(id) FROM products`;
}

export function insertProduct(): string {
  return `INSERT INTO products(
          slug, product_name, sku, sale_price, compare_price, buying_price, quantity,
          short_description, product_description, product_type, published, disable_out_of_stock, note, created_by)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NULLIF($13, ''), $14) RETURNING id, product_name AS name
      `;
}

export function updateProduct(): string {
  return `UPDATE products SET slug = $2, product_name = $3, sku = $4, sale_price = $5,
         compare_price = $6, buying_price = $7, quantity = $8, short_description = $9, product_description = $10,
         product_type = $11, published = $12, disable_out_of_stock = $13, note = NULLIF($14, ''), updated_by = $15 WHERE id = $1
      `;
}

export function updateProductUpdateBy(): string {
  return `
         UPDATE products SET updated_by = $2 WHERE id = $1
      `;
}
// **** galleries ****

export function insertImage(): string {
  return `INSERT INTO gallery(product_id, image, is_thumbnail) VALUES($1, $2, $3) RETURNING id`;
}

export function getImage(): string {
  return `SELECT id FROM gallery WHERE image = $1`;
}

export function deleteImage(): string {
  return `DELETE FROM gallery WHERE id = $1`;
}

// **** product_categories ****

export function insertProductCategory(): string {
  return `INSERT INTO product_categories(product_id, category_id) VALUES($1, $2)`;
}

export function deleteProductCategory(): string {
  return `DELETE FROM product_categories WHERE product_id = $1 AND category_id = $2`;
}

// **** product_shipping_info ****

export function insertProductShippingInfo(): string {
  return `INSERT INTO product_shipping_info(product_id, weight, weight_unit, volume, volume_unit, 
    dimension_width, dimension_height, dimension_depth, dimension_unit) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
}

// **** product_tags ****

export function insertProductTag(): string {
  return `INSERT INTO product_tags(product_id, tag_id) VALUES($1, $2)`;
}

export function deleteProductTag(): string {
  return `DELETE FROM product_tags WHERE product_id = $1 AND tag_id = $2`;
}

// **** product_suppliers ****

export function insertProductSupplier(): string {
  return `INSERT INTO product_suppliers(product_id, supplier_id) VALUES($1, $2)`;
}

export function deleteProductSupplier(): string {
  return `DELETE FROM product_suppliers WHERE product_id = $1 AND supplier_id = $2`;
}

// **** product_shippings ****

export function insertProductShipping(): string {
  return `INSERT INTO product_shippings(product_id, shipping_id) VALUES($1, $2) RETURNING id`;
}

export function updateProductShipping(): string {
  return `UPDATE product_shippings SET shipping_id = $2 WHERE id = $1`;
}

export function deleteProductShipping(): string {
  return `DELETE FROM product_shippings WHERE id = $1`;
}

// **** product_shipping_options ****

export function insertProductShippingOption(): string {
  return `INSERT INTO product_shipping_options(product_shipping_id, shipping_price, shipping_zones) VALUES($1, $2, $3)`;
}

export function updateProductShippingOption(): string {
  return `UPDATE product_shipping_options SET shipping_price = $2, shipping_zones = $3 WHERE id = $1`;
}

export function deleteProductShippingOption(): string {
  return `DELETE FROM product_shipping_options WHERE product_shipping_id = $1`;
}

export function deleteProductShippingOptionById(): string {
  return `DELETE FROM product_shipping_options WHERE id = $1`;
}

// **** product_attributes ****

export function getProductAttribute(): string {
  return `SELECT * FROM product_attributes WHERE product_id = $1 AND attribute_id = $2`;
}

export function insertProductAttribute(): string {
  return `INSERT INTO product_attributes(product_id, attribute_id) VALUES($1, $2) RETURNING id`;
}

export function deleteProductAttribute(): string {
  return `DELETE FROM product_attributes WHERE id = $1`;
}

// **** attribute_values ****

export function getAttributeValue(): string {
  return `SELECT attribute_id AS "attributeId" FROM attribute_values WHERE id = $1`;
}

// **** product_attribute_values ****

export function getProductAttributeValue(): string {
  return `SELECT id FROM product_attribute_values WHERE product_attribute_id = $1 AND attribute_value_id = $2`;
}

export function insertProductAttributeValue(): string {
  return `INSERT INTO product_attribute_values(product_attribute_id, attribute_value_id) VALUES($1, $2)`;
}

export function deleteProductAttributeValue(): string {
  return `DELETE FROM product_attribute_values WHERE product_attribute_id = $1 AND attribute_value_id = $2`;
}

export function deleteProductAttributeValueAll(): string {
  return `DELETE FROM product_attribute_values WHERE product_attribute_id = $1`;
}

export function deleteProductAttributeValueById(): string {
  return `DELETE FROM product_attribute_values WHERE id = $1`;
}

// **** variant_options ****

export function insertVariantOption(): string {
  return `INSERT INTO variant_options(title, image_id, product_id, sale_price, compare_price, buying_price, quantity, sku, active) 
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`;
}

export function updateVariantOption(): string {
  return `UPDATE variant_options SET title = $2, image_id = $3, sale_price = $4, compare_price = $5, buying_price = $6, quantity = $7, sku = $8, active = $9 WHERE id = $1`;
}

export function deleteVariantOption(): string {
  return `DELETE FROM variant_options WHERE id = $1`;
}

// **** variants ****

export function getVariant(): string {
  return `SELECT * FROM variants WHERE variant_option_id = $1`;
}

export function insertVariant(): string {
  return `INSERT INTO variants(variant_option, product_id, variant_option_id) VALUES($1, $2, $3) RETURNING id`;
}

export function deleteVariant(): string {
  return `DELETE FROM variants WHERE id = $1`;
}

// **** variant_values ****

export function insertVariantValue(): string {
  return `INSERT INTO variant_values(variant_id, product_attribute_value_id) VALUES($1, $2)`;
}

export function deleteVariantValue(): string {
  return `DELETE FROM variant_values WHERE variant_id = $1 RETURNING *`;
}

// --- Popular Products

export function getPopularProducts(): string {
  return `SELECT pd.id, pd.product_name AS name, pd.slug, pd.disable_out_of_stock AS "disableOutOfStock", 
  jsonb_build_object('id', pd.product_type) AS "type",
   
  CASE WHEN pd.product_type = 'simple' THEN pd.quantity END AS "quantity",

  CASE 
    WHEN pd.product_type = 'simple' THEN pd.quantity >= 1
    WHEN pd.product_type = 'variable' THEN (SELECT SUM(vp.quantity) >= 1
    FROM variant_options vp WHERE vp.product_id = pd.id AND vp.active IS TRUE) END AS "inStock",
  
  CASE 
    WHEN pd.product_type = 'variable' THEN (SELECT MIN(vp.sale_price) 
    FROM variant_options vp WHERE vp.product_id = pd.id AND vp.active IS TRUE)
    WHEN pd.product_type = 'simple' THEN pd.sale_price::FLOAT END AS "salePrice",
  
  CASE 
    WHEN pd.product_type = 'variable' THEN (SELECT DISTINCT ON(vp.compare_price) vp.compare_price 
    FROM variant_options vp WHERE vp.product_id = pd.id AND vp.active IS TRUE ORDER BY vp.compare_price LIMIT 1)
    WHEN pd.product_type = 'simple' THEN pd.compare_price::FLOAT END AS "comparePrice",
  
  (SELECT gal.image FROM gallery AS gal WHERE gal.product_id = pd.id AND gal.is_thumbnail = true) AS thumbnail
  FROM products AS pd WHERE pd.published IS TRUE`;
}

export function getCategoryProduct(): string {
  return `SELECT pd.id, pd.product_name AS name, pd.slug, pd.disable_out_of_stock AS "disableOutOfStock", 
  jsonb_build_object('id', pd.product_type) AS "type",

  CASE WHEN pd.product_type = 'simple' THEN pd.quantity END AS "quantity",

  CASE 
    WHEN pd.product_type = 'simple' THEN pd.quantity >= 1
    WHEN pd.product_type = 'variable' THEN (SELECT SUM(vp.quantity) >= 1
    FROM variant_options vp WHERE vp.product_id = pd.id AND vp.active IS TRUE) END AS "inStock",
  
  CASE 
    WHEN pd.product_type = 'variable' THEN (SELECT MIN(vp.sale_price) 
    FROM variant_options vp WHERE vp.product_id = pd.id AND vp.active IS TRUE)
    WHEN pd.product_type = 'simple' THEN pd.sale_price::FLOAT END AS "salePrice",
  
  CASE 
    WHEN pd.product_type = 'variable' THEN (SELECT DISTINCT ON(vp.compare_price) vp.compare_price 
    FROM variant_options vp WHERE vp.product_id = pd.id AND vp.active IS TRUE ORDER BY vp.compare_price LIMIT 1)
    WHEN pd.product_type = 'simple' THEN pd.compare_price::FLOAT END AS "comparePrice",
  
  (SELECT gal.image FROM gallery AS gal WHERE gal.product_id = pd.id AND gal.is_thumbnail = true) AS thumbnail
  FROM products AS pd WHERE pd.published IS TRUE AND pd.id IN (SELECT pc.product_id FROM product_categories pc WHERE pc.category_id = (SELECT cate.id FROM categories cate WHERE cate.name = $1))`;
}

export function deleteProduct(): string {
  return `DELETE FROM products WHERE id = $1 RETURNING id`;
}

export function getProductImages(): string {
  return `SELECT id, image FROM gallery WHERE product_id = $1`;
}
