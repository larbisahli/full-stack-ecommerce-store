export function getTodaysRevenue(): string {
  return `SELECT SUM((SELECT SUM("unit_price"*"quantity")::FLOAT FROM order_items WHERE order_id = o.id)::FLOAT)
          FROM orders AS o WHERE o.order_status = 'complete' AND DATE(o.created_at) BETWEEN NOW() - INTERVAL '24 HOURS' AND NOW()`;
}

export function getTotal30DaysRevenue(): string {
  return `SELECT SUM((SELECT SUM("unit_price"*"quantity")::FLOAT FROM order_items WHERE order_id = o.id)::FLOAT)
          FROM orders AS o WHERE o.order_status = 'complete' AND o.created_at >= date_trunc('month', current_date - interval '1' month) AND o.created_at <= now()`;
}

export function getTotalOrders(): string {
  return `SELECT count(id)::INTEGER FROM orders o WHERE created_at >= date_trunc('month', current_date - interval '1' month) AND created_at <= now()
`;
}

export function getSalesHistory(): string {
  return `SELECT (SELECT COUNT(o.id) FROM orders as o WHERE EXTRACT(MONTH FROM o.created_at) = EXTRACT(MONTH FROM f) AND EXTRACT(YEAR FROM o.created_at) = EXTRACT(YEAR FROM f)) as sales, f as dt from 
  generate_series( (select(now() - interval '1 year'))::date, now()::date, '1 month'::interval) as f`;
}
