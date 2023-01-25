export function getSupplier(): string {
  return `SELECT sup.id, sup.supplier_name AS name, sup.company, sup.phone_number AS "phoneNumber", sup.address_line1 AS "addressLine1", sup.address_line2 AS "addressLine2", sup.city, sup.note,
    (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name, 'profile', json_build_object('image', stc.image, 'placeholder', stc.placeholder)) FROM staff_accounts AS stc WHERE stc.id = sup.created_by) AS "createdBy",
    (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name, 'profile', json_build_object('image', stu.image, 'placeholder', stu.placeholder)) FROM staff_accounts AS stu WHERE stu.id = sup.updated_by) AS "updatedBy",
    (SELECT json_build_object('id', cty.id, 'name', cty.name, 'phoneCode', cty.phone_code) FROM countries AS cty WHERE cty.id = sup.country_id) AS country
    FROM suppliers AS sup WHERE sup.id = $1`;
}

export function getSuppliers(): string {
  return `SELECT sup.id, sup.supplier_name AS name, sup.company, sup.phone_number AS "phoneNumber", sup.address_line1 AS "addressLine1", sup.created_at AS "createdAt",
    (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name) FROM staff_accounts AS stc WHERE stc.id = sup.created_by) AS "createdBy",
    (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name) FROM staff_accounts AS stu WHERE stu.id = sup.updated_by) AS "updatedBy",
    (SELECT json_build_object('id', cty.id, 'name', cty.name, 'phoneCode', cty.phone_code) FROM countries AS cty WHERE cty.id = sup.country_id) AS country
    FROM suppliers AS sup ORDER BY $1 ASC LIMIT $2 OFFSET $3`;
}

export function getSuppliersForSelect(): string {
  return `SELECT sup.id, sup.supplier_name AS name FROM suppliers AS sup ORDER BY $1 ASC LIMIT $2 OFFSET $3`;
}

export function getSuppliersCount(): string {
  return `SELECT count(id) FROM suppliers`;
}

export function insertSupplier(): string {
  return `INSERT INTO suppliers(supplier_name, company, phone_number, address_line1, address_line2, country_id, city, note, created_by) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING supplier_name AS name`;
}

export function updateSupplier(): string {
  return `UPDATE suppliers SET supplier_name = $2, company = $3, phone_number = $4, 
            address_line1 = $5, address_line2 = $6, country_id = $7, city = $8, note = $9, updated_by = $10 WHERE id = $1 
            RETURNING supplier_name AS name`;
}

export function deleteSupplier(): string {
  return `DELETE FROM suppliers WHERE id = $1 RETURNING supplier_name AS name`;
}
