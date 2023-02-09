export function getSettings(): string {
  return `SELECT (SELECT json_build_object('image', logo_image_path)) AS "logo", (SELECT json_build_object('image', favicon_image_path)) AS "favicon", currency, socials,
         store_name AS "storeName", store_email AS "storeEmail", store_number AS "storeNumber",
         max_checkout_quantity AS "maxCheckoutQuantity", 
         (SELECT json_build_object(
         'metaTitle', meta_title, 'metaDescription', meta_description, 
         'metaTags', meta_tags, 'ogTitle', og_title, 
         'ogDescription', og_description, 'ogImage', (SELECT json_build_object('image', og_image_path)), 
         'twitterHandle', twitter_handle)) AS "seo" FROM settings WHERE id = 'store'`;
}

export function updateSettings(): string {
  return `UPDATE settings SET logo_image_path = $1, favicon_image_path = $2, currency = $3,
          meta_title = $4, meta_description = $5, meta_tags = $6, og_title = $7,
          og_description = $8, og_image_path = $9, twitter_handle = $10, socials = $11, max_checkout_quantity = $12,
          store_email = $13, store_name = $14, store_number = $15 WHERE id = 'store' RETURNING id`;
}
