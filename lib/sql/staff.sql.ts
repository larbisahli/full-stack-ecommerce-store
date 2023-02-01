// **** (staff_accounts) Table Queries ****
export function getStaff(): string {
  return `SELECT staff.id, staff.first_name AS "firstName", staff.last_name AS "lastName", staff.phone_number AS "phoneNumber", staff.email, staff.is_admin as "isAdmin",
    (SELECT json_build_object('image', staff.image))  as profile, staff.active, staff.created_at AS "createdAt", staff.updated_at AS "updatedAt"
    FROM staff_accounts AS staff WHERE staff.id = $1`;
}

export function getStaffs(): string {
  return `SELECT staff.id, staff.first_name AS "firstName", staff.last_name AS "lastName", staff.email, staff.phone_number AS "phoneNumber", staff.is_admin as "isAdmin",
    (SELECT json_build_object('image', staff.image)) as profile, staff.active, staff.created_at AS "createdAt",
    (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name) FROM staff_accounts AS stc WHERE stc.id = staff.created_by) AS "createdBy",
    (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name) FROM staff_accounts AS stu WHERE stu.id = staff.updated_by) AS "updatedBy"
    FROM staff_accounts AS staff ORDER BY staff.created_at ASC LIMIT $1 OFFSET $2`;
}

export function staffsCount(): string {
  return `SELECT count(id) FROM staff_accounts`;
}

export function insertStaff(): string {
  return `INSERT INTO staff_accounts(first_name, last_name, phone_number, email,
           password_hash, image, is_admin, created_by) VALUES($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING id, first_name AS fistName, last_name AS lastName`;
}

export function updateStaff(): string {
  return `UPDATE staff_accounts SET first_name = $2, last_name = $3, phone_number = $4,
          email = $5, image = $6, is_admin = $7, updated_by = $8
          WHERE id = $1 RETURNING id, first_name As fistName, last_name AS lastName`;
}

export function deleteStaff(): string {
  return `DELETE FROM staff_accounts WHERE id = $1 RETURNING id, first_name AS fistName, last_name AS lastName`;
}

export function banStaff(): string {
  return `UPDATE staff_accounts SET active = $2, updated_by = $3 WHERE id = $1 RETURNING id, first_name AS fistName, last_name AS lastName`;
}
