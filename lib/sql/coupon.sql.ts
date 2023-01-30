export function getCouponsCount(): string {
  return `SELECT count(id) FROM coupons`;
}

// **** ADMIN QUERIES ****
export function getCouponForAdmin(): string {
  return `SELECT cop.id, cop.code, cop.order_amount_limit AS "orderAmountLimit", cop.discount_value AS "discountValue", cop.discount_type AS "discountType", 
      cop.times_used AS "timesUsed", cop.max_usage AS "maxUsage", cop.coupon_start_date AS "couponStartDate", cop.coupon_end_date AS "couponEndDate", cop.created_at AS "createAt", cop.updated_at AS "updatedAt"
      FROM coupons AS cop WHERE cop.id = $1`;
}

export function getCouponsForAdmin(): string {
  return `SELECT cop.id, cop.code, cop.order_amount_limit AS "orderAmountLimit", cop.discount_value AS "discountValue", cop.discount_type AS "discountType", 
      cop.times_used AS "timesUsed", cop.max_usage AS "maxUsage", cop.coupon_start_date AS "couponStartDate", cop.coupon_end_date AS "couponEndDate", cop.created_at AS "createAt", cop.updated_at AS "updatedAt", 
      (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name) FROM staff_accounts AS stc WHERE stc.id = cop.created_by) AS "createdBy",
      (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name) FROM staff_accounts AS stu WHERE stu.id = cop.updated_by) AS "updatedBy"
      FROM coupons AS cop ORDER BY $1 ASC LIMIT $2 OFFSET $3`;
}

export function insertCoupon(): string {
  return `INSERT INTO coupons(code, order_amount_limit, discount_value, discount_type,
              max_usage, coupon_start_date, coupon_end_date, created_by) 
              VALUES($1, $2, $3, $4, $5, to_timestamp($6, 'YYYY-MM-DD HH24:MI:SS'), to_timestamp($7, 'YYYY-MM-DD HH24:MI:SS'), $8) RETURNING id, code`;
}

export function updateCoupon(): string {
  return `UPDATE coupons SET code = $2, order_amount_limit= $3, discount_value = $4,
            discount_type = $5, max_usage = $6, coupon_start_date = to_timestamp($7, 'YYYY-MM-DD HH24:MI:SS'), 
            coupon_end_date = to_timestamp($8, 'YYYY-MM-DD HH24:MI:SS'), updated_by = $9 WHERE id = $1 RETURNING id, code`;
}

export function deleteCoupon(): string {
  return `DELETE FROM coupons WHERE id = $1 RETURNING id, code`;
}
