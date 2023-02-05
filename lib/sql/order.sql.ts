export function insertOrder(): string {
  return `INSERT INTO orders(full_name, address_line1, city, phone_number, order_status)
  VALUES($1, $2, $3, $4, $5) RETURNING id`;
}
