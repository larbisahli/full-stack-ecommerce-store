export function getAttributesCount(): string {
  return `SELECT count(id) FROM attributes`;
}

// **** ADMIN QUERIES ****

export function getAttributeForAdmin(): string {
  return `SELECT att.id, att.attribute_name AS name, att.created_at AS "createdAt", att.updated_at as "updatedAt", 
  ARRAY((SELECT json_build_object('id', att_v.id, 'value', att_v.attribute_value, 'color', att_v.color) FROM attribute_values AS att_v WHERE att_v.attribute_id = att.id)) AS values
  FROM attributes AS att WHERE att.id = $1`;
}

export function getAttributesForAdmin(): string {
  return `SELECT att.id, att.attribute_name AS name, att.created_at AS "createdAt", att.updated_at AS "updatedAt", 
  (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name) FROM staff_accounts AS stc WHERE stc.id = att.created_by) AS "createdBy",
  (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name) FROM staff_accounts AS stu WHERE stu.id = att.updated_by) AS "updatedBy",
  ARRAY((SELECT json_build_object('id', att_v.id, 'value', att_v.attribute_value) FROM attribute_values AS att_v WHERE att_v.attribute_id = att.id)) AS values
  FROM attributes AS att order by att.created_at DESC LIMIT $1 OFFSET $2`;
}

export function insertAttribute(): string {
  return `INSERT INTO attributes(attribute_name, created_by) VALUES($1, $2) RETURNING id, attribute_name AS name`;
}

export function updateAttribute(): string {
  return `UPDATE attributes SET attribute_name = $2, updated_by = $3 WHERE id = $1 RETURNING id`;
}

export function deleteAttribute(): string {
  return `DELETE FROM attributes WHERE id = $1 RETURNING id`;
}

// **** (attribute_values) Table ****

export function insertAttributeValues(): string {
  return `INSERT INTO attribute_values(attribute_id, attribute_value, color) VALUES($1, $2, NULLIF($3, '')) RETURNING id, attribute_value AS value`;
}

export function updateAttributeValues(): string {
  return `UPDATE attribute_values SET attribute_value = $2, color = $3 WHERE id = $1`;
}

export function deleteAttributeValue(): string {
  return `DELETE FROM attribute_values WHERE id = $1 RETURNING id`;
}
