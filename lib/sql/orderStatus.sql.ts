export function getOrderStatusCount(): string {
  return `SELECT count(id) FROM order_statuses`;
}

// **** ADMIN QUERIES ****

export function getOrderStatusForAdmin(): string {
  return `SELECT os.id, os.status_name AS name, os.color, os.privacy, os.created_at AS "createdAt", os.updated_at AS "updatedAt", 
    (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name, 'profile', json_build_object('image', stc.image, 'placeholder', stc.placeholder)) FROM staff_accounts AS stc WHERE stc.id = os.created_by) AS "createdBy",
    (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name, 'profile', json_build_object('image', stu.image, 'placeholder', stu.placeholder)) FROM staff_accounts AS stu WHERE stu.id = os.updated_by) AS "updatedBy"
    FROM order_statuses AS os WHERE os.id = $1`;
}

export function getOrderStatusesForAdmin(): string {
  return `SELECT os.id, os.status_name AS name, os.color, os.privacy, os.created_at AS "createdAt", os.updated_at AS "updatedAt", 
        (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name) FROM staff_accounts AS stc WHERE stc.id = os.created_by) AS "createdBy",
        (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name) FROM staff_accounts AS stu WHERE stu.id = os.updated_by) AS "updatedBy"
        FROM order_statuses AS os ORDER BY created_at DESC LIMIT $1 OFFSET $2`;
}

export function insertOrderStatus(): string {
  return `
            INSERT INTO order_statuses(status_name, color, privacy, created_by) 
            VALUES($1, $2, $3, $4) RETURNING id, status_name AS name
        `;
}

export function updateOrderStatus(): string {
  return `
           UPDATE order_statuses SET status_name = $2, color = $3, privacy = $4, updated_by = $5
           WHERE id = $1 RETURNING id, status_name AS name
        `;
}

export function deleteOrderStatus(): string {
  return `DELETE FROM order_statuses WHERE id = $1 RETURNING id, status_name AS name`;
}
