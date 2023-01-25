export function getTagsCount(): string {
  return `SELECT count(id) FROM tags`;
}

// **** ADMIN QUERIES ****
export function getTagForAdmin(): string {
  return `SELECT tag.id, tag.tag_name AS name, tag.icon, tag.created_at AS "createdAt", tag.updated_at AS "updatedAt", 
    (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name, 'profile', json_build_object('image', stc.image, 'placeholder', stc.placeholder)) FROM staff_accounts AS stc WHERE stc.id = tag.created_by) AS "createdBy",
    (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name, 'profile', json_build_object('image', stu.image, 'placeholder', stu.placeholder)) FROM staff_accounts AS stu WHERE stu.id = tag.updated_by) AS "updatedBy"
    FROM tags AS tag WHERE tag.id = $1`;
}

export function getTagsForAdmin(): string {
  return `SELECT tag.id, tag.tag_name AS name, tag.icon, tag.created_at AS "createdAt", tag.updated_at AS "updatedAt", 
    (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name) FROM staff_accounts AS stc WHERE stc.id = tag.created_by) AS "createdBy",
    (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name) FROM staff_accounts AS stu WHERE stu.id = tag.updated_by) AS "updatedBy"
    FROM tags AS tag ORDER BY $1 ASC LIMIT $2 OFFSET $3`;
}

export function getTagsSelectForAdmin(): string {
  return `SELECT tag.id, tag.tag_name AS name FROM tags AS tag ORDER BY $1 ASC LIMIT $2 OFFSET $3`;
}

export function insertTag(): string {
  return `INSERT INTO tags(tag_name, icon, created_by) VALUES($1, $2, $3) RETURNING id, tag_name AS name`;
}

export function updateTag(): string {
  return `UPDATE tags SET tag_name = $2, icon = $3, updated_by = $4 WHERE id = $1 RETURNING id, tag_name AS name`;
}

export function deleteTag(): string {
  return `DELETE FROM tags WHERE id = $1 RETURNING id, tag_name AS name`;
}
