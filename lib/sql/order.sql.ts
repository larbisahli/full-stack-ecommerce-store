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
  (SELECT SUM("unit_price"*"quantity") FROM order_items WHERE order_id = o.id) AS total
  FROM orders AS o LIMIT $1 OFFSET $2`;
}

export function getOrdersCount(): string {
  return `SELECT count(id) FROM orders`;
}
