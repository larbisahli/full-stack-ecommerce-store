export function getCategory(): string {
  return `SELECT id, name, description, FROM categories WHERE id = $1`;
}

export function getCategories(): string {
  return `SELECT cate.id, cate.name,
  ARRAY(SELECT json_build_object('id', child_cate.id, 'name', child_cate.name) FROM categories AS child_cate WHERE child_cate.parent_id = cate.id) AS "subCategories"
  FROM categories AS cate WHERE parent_id is null`;
}

export function getCategoriesCount(): string {
  return `SELECT count(id) FROM categories WHERE parent_id is null`;
}

// **** ADMIN QUERIES ****

export function getCategoryForAdmin(): string {
  return `SELECT cate.id, cate.parent_id AS "parentId", cate.name, cate.description,
  json_build_object('image', cate.image, 'placeholder', cate.placeholder) as thumbnail, cate.created_at AS "createdAt", cate.updated_at AS "updatedAt", 
  (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name, 'profile', json_build_object('image', stc.image, 'placeholder', stc.placeholder)) 
  FROM staff_accounts AS stc WHERE stc.id = cate.created_by) AS "createdBy",
  (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name, 'profile', json_build_object('image', stu.image, 'placeholder', stu.placeholder)) 
  FROM staff_accounts AS stu WHERE stu.id = cate.updated_by) AS "updatedBy",
  (SELECT json_build_object('id', parent_cate.id, 'name', parent_cate.name) FROM categories AS parent_cate WHERE parent_cate.id = cate.parent_id) AS parent,
  (SELECT EXISTS(SELECT cate_check.id FROM categories AS cate_check WHERE cate_check.parent_id = cate.id)) AS "hasChildren"
  FROM categories AS cate WHERE cate.id = $1`;
}

export function getCategoriesForAdmin(): string {
  return `SELECT cate.id, cate.parent_id AS "parentId", cate.name, cate.description, cate.created_at AS "createdAt", cate.updated_at AS "updatedAt", 
  (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name) FROM staff_accounts AS stc WHERE stc.id = cate.created_by) AS "createdBy",
  (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name) FROM staff_accounts AS stu WHERE stu.id = cate.updated_by) AS "updatedBy",
  ARRAY((SELECT json_build_object('id', child_cate.id, 'parentId', child_cate.parent_id, 'name', child_cate.name, 
  'description', child_cate.description, 'createdAt', child_cate.created_at, 'updatedAt', child_cate.updated_at,
  'createdBy', ((SELECT json_build_object('id', child_stc.id, 'firstName', child_stc.first_name, 'lastName', child_stc.last_name) 
  FROM staff_accounts AS child_stc WHERE child_stc.id = child_cate.created_by)),
  'updatedBy', ((SELECT json_build_object('id', child_stu.id, 'firstName', child_stu.first_name, 'lastName', child_stu.last_name) 
  FROM staff_accounts AS child_stu WHERE child_stu.id = child_cate.updated_by))) 
  FROM categories AS child_cate WHERE child_cate.parent_id = cate.id)) AS children
  FROM categories AS cate WHERE cate.parent_id IS NULL LIMIT $1 OFFSET $2`;
}

export function getCategoriesChildrenForAdmin(): string {
  return `SELECT cate.id, cate.parent_id AS "parentId", cate.name, cate.description, cate.icon, 
  cate.created_at AS "createdAt", cate.updated_at AS "updatedAt", 
  (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name) 
  FROM staff_accounts AS stc WHERE stc.id = cate.created_by) AS "createdBy",
  (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name) 
  FROM staff_accounts AS stu WHERE stu.id = cate.updated_by) AS "updated_by",
  (SELECT EXISTS(SELECT cate_check.id FROM categories AS cate_check WHERE cate_check.parent_id = cate.id)) AS "hasChildren"
  FROM categories AS cate WHERE cate.parent_id = $1 ORDER BY updated_at ASC`;
}

export function getCategoriesParentsSelectForAdmin(): string {
  return `SELECT cate.id, cate.name FROM categories AS cate WHERE cate.parent_id IS NULL LIMIT $1`;
}

export function getCategoriesParentsSelectForAdminWithId(): string {
  return `SELECT cate.id, cate.name FROM categories AS cate WHERE cate.parent_id IS NULL and cate.id != $1 LIMIT $2`;
}

export function getCategoriesSelectAllForAdmin(): string {
  return `SELECT cate.id, cate.name FROM categories AS cate ORDER BY $1 ASC LIMIT $2 OFFSET $3`;
}

// COALESCE((SELECT MAX(display_order)+1 FROM categories)
export function insertCategory(): string {
  return `INSERT INTO categories(parent_id, name, description, image, placeholder, created_by)
          VALUES($1, $2, NULLIF($3, ''), $4, $5, $6) RETURNING id, name
      `;
}

export function updateCategory(): string {
  return `UPDATE categories SET parent_id = $2, name = $3, description = $4, image = $5, placeholder = $6,  updated_by = $7
         WHERE id = $1 RETURNING id, name
      `;
}
