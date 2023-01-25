// **** (staff_accounts) Table Queries ****
export function getStaff(): string {
  return `SELECT staff.id, staff.first_name AS "firstName", staff.last_name AS "lastName", staff.phone_number AS "phoneNumber", staff.email, 
    json_build_object('image', staff.image, 'placeholder', staff.placeholder) as profile, staff.active, staff.created_at AS "createdAt", staff.updated_at AS "updatedAt", 
    (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name, 'profile', json_build_object('image', stc.image, 'placeholder', stc.placeholder)) FROM staff_accounts AS stc WHERE stc.id = staff.created_by) AS "createdBy",
    (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name, 'profile', json_build_object('image', stu.image, 'placeholder', stu.placeholder)) FROM staff_accounts AS stu WHERE stu.id = staff.updated_by) AS "updatedBy",
    (SELECT json_build_object('id', r.id::integer, 'roleName', r.role_name, 'privileges', r.privileges) FROM roles AS r WHERE r.id  = staff.role_id) AS role
    FROM staff_accounts AS staff WHERE staff.id = $1`;
}

export function getStaffs(): string {
  return `SELECT staff.id, staff.first_name AS "firstName", staff.last_name AS "lastName", staff.email, 
     json_build_object('image', staff.image, 'placeholder', staff.placeholder) as profile, staff.active, staff.created_at AS "createdAt",
    (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name) FROM staff_accounts AS stc WHERE stc.id = staff.created_by) AS "createdBy",
    (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name) FROM staff_accounts AS stu WHERE stu.id = staff.updated_by) AS "updatedBy",
    (SELECT json_build_object('id', r.id::integer, 'roleName', r.role_name, 'privileges', r.privileges) FROM roles AS r WHERE r.id  = staff.role_id) AS role
    FROM staff_accounts AS staff ORDER BY staff.created_at ASC LIMIT $1 OFFSET $2`;
}

export function staffsCount(): string {
  return `SELECT count(id) FROM staff_accounts`;
}

export function insertStaff(): string {
  return `INSERT INTO staff_accounts(first_name, last_name, phone_number, email, 
           password_hash, image, placeholder, role_id, created_by) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
           RETURNING id, first_name AS fistName, last_name AS lastName`;
}

export function updateStaff(): string {
  return `UPDATE staff_accounts SET first_name = $2, last_name = $3, phone_number = $4,
          email = $5, image = $6, placeholder = $7, role_id = $8, updated_by = $9
          WHERE id = $1 RETURNING id, first_name As fistName, last_name AS lastName`;
}

export function deleteStaff(): string {
  return `DELETE FROM staff_accounts WHERE id = $1 RETURNING id, first_name AS fistName, last_name AS lastName`;
}

export function getRoles(): string {
  return `SELECT id, role_name AS "roleName", privileges from roles`;
}

export function banStaff(): string {
  return `UPDATE staff_accounts SET active = $2, updated_by = $3 WHERE id = $1 RETURNING id, first_name AS fistName, last_name AS lastName`;
}
