export function getHeroBanners(): string {
  return `SELECT slide.id, slide.destination_url AS "destinationUrl", slide.title, json_build_object('image', slide.image, 'placeholder', slide.placeholder) AS thumbnail, 
         slide.description, slide.btn_label AS "btnLabel", slide.styles 
         FROM slideshows AS slide WHERE published is TRUE ORDER BY slide.display_order ASC`;
}

export function getHeroBannerCount(): string {
  return `SELECT count(id) FROM slideshows`;
}

// **** ADMIN QUERIES ****

export function getHeroCarouselListForAdmin(): string {
  return `SELECT slide.id, slide.title, json_build_object('image', slide.image, 'placeholder', slide.placeholder) AS thumbnail ,slide.clicks, slide.display_order AS "displayOrder", slide.published,  slide.created_at AS "createdAt", slide.updated_at AS "updatedAt", 
    (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name, 'profile', json_build_object('image', stc.image, 'placeholder', stc.placeholder)) FROM staff_accounts AS stc WHERE stc.id = slide.created_by) AS "createdBy",
    (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name, 'profile', json_build_object('image', stu.image, 'placeholder', stu.placeholder)) FROM staff_accounts AS stu WHERE stu.id = slide.updated_by) AS "updatedBy"
    FROM slideshows AS slide ORDER BY slide.display_order ASC LIMIT $1 OFFSET $2`;
}

export function getHeroSlideForAdmin(): string {
  return `SELECT slide.id, slide.destination_url AS "destinationUrl", json_build_object('image', slide.image, 'placeholder', slide.placeholder) AS thumbnail, 
    slide.title, slide.description, slide.btn_label AS "btnLabel", slide.styles, slide.display_order AS "displayOrder", slide.published,  slide.created_at AS "createdAt", slide.updated_at AS "updatedAt", 
    (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name, 'profile', json_build_object('image', stc.image, 'placeholder', stc.placeholder)) FROM staff_accounts AS stc WHERE stc.id = slide.created_by) AS "createdBy",
    (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name, 'profile', json_build_object('image', stu.image, 'placeholder', stu.placeholder)) FROM staff_accounts AS stu WHERE stu.id = slide.updated_by) AS "updatedBy"
    FROM slideshows AS slide WHERE slide.id = $1`;
}

export function insertSlide(): string {
  return `INSERT INTO slideshows(title, destination_url, image, placeholder, description, btn_label, display_order, 
           published, styles, created_by) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`;
}

export function updateSlide(): string {
  return `UPDATE slideshows SET title = $2, destination_url = $3, image = $4, placeholder = $5, 
           description = $6, btn_label = $7, display_order = $8, published = $9,
           styles = $10, updated_by = $11 WHERE id = $1 RETURNING id`;
}

export function deleteSlide(): string {
  return `DELETE FROM slideshows WHERE id = $1 RETURNING id`;
}
