export function insertOrder(): string {
  return `INSERT INTO orders(id, full_name, address_line1, city, phone_number, order_status)
  VALUES($1, $2, $3, $4, $5, $6) RETURNING id`;
}

export function insertOrderItem(): string {
  return `INSERT INTO order_items(product_id, order_id, unit_price, quantity, variant_option_id)
  VALUES($1, $2, $3, $4, $5) RETURNING id`;
}

export function getOrders(): string {
  return `SELECT o.id, o.full_name AS "fullName", o.phone_number as "phoneNumber", o.address_line1 as "addressLine1", o.city, o.order_status as "orderStatus", o.created_at as "createdAt",
  (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name) FROM staff_accounts AS stu WHERE stu.id = o.updated_by) AS "updatedBy",
  (SELECT SUM("unit_price"*"quantity") FROM order_items WHERE order_id = o.id)::FLOAT AS total,
  (SELECT SUM(quantity) FROM order_items WHERE order_id = o.id)::INTEGER AS "totalQuantity",
  (SELECT COUNT(id) FROM order_items WHERE order_id = o.id)::INTEGER AS "productQuantity",
  ARRAY(SELECT (SELECT json_build_object('id', pd.id, 'name', pd.product_name, 'quantity', otpd.quantity,
  'unitPrice', (CASE WHEN pd.product_type = 'variable' THEN (SELECT vp.sale_price FROM variant_options vp WHERE vp.id = otpd.variant_option_id)
  WHEN pd.product_type = 'simple' THEN pd.sale_price::FLOAT END),
  'option', (SELECT variant_option FROM variants WHERE variant_option_id = otpd.variant_option_id)
  ) FROM products AS pd WHERE pd.id = otpd.product_id) as co FROM order_items otpd WHERE otpd.order_id = o.id) AS products
  FROM orders AS o order by o.created_at DESC LIMIT $1 OFFSET $2`;
}

export function getOrder(): string {
  return `SELECT o.id, o.full_name AS "fullName", o.phone_number as "phoneNumber", o.address_line1 as "addressLine1", o.city, o.order_status as "orderStatus", o.created_at as "createdAt",
  (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name) FROM staff_accounts AS stu WHERE stu.id = o.updated_by) AS "updatedBy",
  (SELECT SUM("unit_price"*"quantity") FROM order_items WHERE order_id = o.id)::FLOAT AS total,
  (SELECT SUM(quantity) FROM order_items WHERE order_id = o.id)::INTEGER AS "totalQuantity",
  (SELECT COUNT(id) FROM order_items WHERE order_id = o.id)::INTEGER AS "productQuantity",
  ARRAY(SELECT (SELECT json_build_object('id', pd.id, 'name', pd.product_name, 'sku', pd.sku,'quantity', otpd.quantity,
  'thumbnail', (SELECT gal.image FROM gallery AS gal WHERE gal.product_id = pd.id AND gal.is_thumbnail = true),
  'unitPrice', (CASE WHEN pd.product_type = 'variable' THEN (SELECT vp.sale_price FROM variant_options vp WHERE vp.id = otpd.variant_option_id)
  WHEN pd.product_type = 'simple' THEN pd.sale_price::FLOAT END),
  'option', (SELECT variant_option FROM variants WHERE variant_option_id = otpd.variant_option_id)
  ) FROM products AS pd WHERE pd.id = otpd.product_id) as co FROM order_items otpd WHERE otpd.order_id = o.id) AS products
  FROM orders AS o WHERE o.id = $1`;
}

export function getOrdersCount(): string {
  return `SELECT count(id) FROM orders`;
}

export function updateOrderStatus(): string {
  return `UPDATE orders SET order_status = $2 WHERE id = $1 RETURNING id`;
}
