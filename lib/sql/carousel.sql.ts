export function getHeroBanners(): string {
  return `SELECT slide.id, slide.destination_url AS "destinationUrl", slide.title, slide.image AS thumbnail, 
         slide.description, slide.btn_label AS "btnLabel", slide.styles 
         FROM slideshows AS slide WHERE published is TRUE ORDER BY slide.display_order ASC`;
}

export function getHeroBannerCount(): string {
  return `SELECT count(id) FROM slideshows`;
}

// **** ADMIN QUERIES ****

export function getHeroCarouselListForAdmin(): string {
  return `SELECT slide.id, slide.title, (SELECT json_build_object('image', slide.image )) as thumbnail, 
    slide.clicks, slide.display_order AS "displayOrder", slide.published,  slide.created_at AS "createdAt", slide.updated_at AS "updatedAt", 
    (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name ) FROM staff_accounts AS stc WHERE stc.id = slide.created_by) AS "createdBy",
    (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name ) FROM staff_accounts AS stu WHERE stu.id = slide.updated_by) AS "updatedBy"
    FROM slideshows AS slide ORDER BY slide.display_order ASC`;
}

export function getHeroSlideForAdmin(): string {
  return `SELECT slide.id, slide.destination_url AS "destinationUrl",
   (SELECT json_build_object('image', slide.image )) as thumbnail,
    slide.title, slide.description, slide.btn_label AS "btnLabel", slide.styles, slide.display_order AS "displayOrder", slide.published,  slide.created_at AS "createdAt", slide.updated_at AS "updatedAt"
    FROM slideshows AS slide WHERE slide.id = $1`;
}

export function insertSlide(): string {
  return `INSERT INTO slideshows(title, destination_url, image, description, btn_label, display_order, 
           published, styles, created_by) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`;
}

export function updateSlide(): string {
  return `UPDATE slideshows SET title = $2, destination_url = $3, image = $4,
           description = $5, btn_label = $6, display_order = $7, published = $8,
           styles = $9, updated_by = $10 WHERE id = $1 RETURNING id`;
}

export function deleteSlide(): string {
  return `DELETE FROM slideshows WHERE id = $1 RETURNING id`;
}
