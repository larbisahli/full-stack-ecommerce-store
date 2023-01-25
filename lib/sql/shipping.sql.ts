export function getShippingZone(): string {
  return `SELECT ship.id, ship.name, ship.display_name AS "displayName", ship.active, ship.free_shipping AS "freeShipping", 
  ship.rate_type AS "rateType", ship.created_at AS "createdAt", ship.updated_at AS "updatedAt", 
  (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name, 'profile', json_build_object('image', stc.image, 'placeholder', stc.placeholder)) 
  FROM staff_accounts AS stc WHERE stc.id = ship.created_by) AS "createdBy",
  (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name, 'profile', json_build_object('image', stu.image, 'placeholder', stu.placeholder)) 
  FROM staff_accounts AS stu WHERE stu.id = ship.updated_by) AS "updatedBy"
  FROM shipping_zones AS ship WHERE ship.id = $1`;
}

export function getZones(): string {
  return `SELECT distinct country.id, country.name, country.iso FROM countries AS country 
  INNER JOIN shipping_country_zones ON (shipping_country_zones.country_id = country.id) 
  WHERE shipping_country_zones.shipping_zone_id = $1`;
}

export function getShippingRates(): string {
  return `SELECT distinct rate.id, jsonb_build_object('unit', rate.weight_unit) AS "weightUnit", rate.min_value AS "minValue", 
  rate.max_value AS "maxValue", rate.no_max AS "noMax", rate.price FROM shipping_rates AS rate 
  WHERE rate.shipping_zone_id = $1`;
}

export function getCountries(): string {
  return `SELECT id, iso, name, upper_name AS "upperName", iso3, num_code AS "numCode", phone_code AS "phoneCode" FROM countries`;
}

export function getShippingZones(): string {
  return `SELECT ship.id, ship.name, ship.active, ship.free_shipping AS "freeShipping", 
  ship.rate_type AS "rateType", ship.created_at AS "createdAt", ship.updated_at AS "updatedAt", 
  (SELECT json_build_object('id', stc.id, 'firstName', stc.first_name, 'lastName', stc.last_name) 
  FROM staff_accounts AS stc WHERE stc.id = ship.created_by) AS "createdBy",
  (SELECT json_build_object('id', stu.id, 'firstName', stu.first_name, 'lastName', stu.last_name) 
  FROM staff_accounts AS stu WHERE stu.id = ship.updated_by) AS "updatedBy"
  FROM shipping_zones AS ship ORDER BY $1 ASC LIMIT $2 OFFSET $3`;
}

export function getShippingsSelectForAdmin(): string {
  return `SELECT ship.id, ship.shipper_name FROM shippings AS ship ORDER BY $1 ASC LIMIT $2 OFFSET $3`;
}

export function getShippingZonesCount(): string {
  return `SELECT count(id) FROM shipping_zones`;
}

export function insertShippingZone(): string {
  return `INSERT INTO shipping_zones(name, display_name, active, free_shipping, rate_type, created_by) VALUES($1, $2, $3, $4, $5, $6) RETURNING id`;
}

export function updateShippingZone(): string {
  return `UPDATE shipping_zones SET name = $2, display_name = $3, active = $4, free_shipping = $5, rate_type = $6, updated_by = $7 WHERE id = $1 RETURNING id`;
}

export function insertShippingCountryZone(): string {
  return `INSERT INTO shipping_country_zones(shipping_zone_id, country_id) VALUES($1, $2)`;
}

export function insertShippingRate(): string {
  return `INSERT INTO shipping_rates(shipping_zone_id, weight_unit, min_value, max_value, no_max, price) VALUES($1, $2, $3, $4, $5, $6)`;
}

export function updateShippingRate(): string {
  return `UPDATE shipping_rates SET weight_unit = $2, min_value = $3, max_value = $4, no_max = $5, price = $6 WHERE id = $1`;
}

export function deleteShippingZone(): string {
  return `DELETE FROM shipping_zones WHERE id = $1 RETURNING id`;
}

export function deleteShippingCountryZone(): string {
  return `DELETE FROM shipping_country_zones WHERE shipping_zone_id = $1`;
}

export function deleteShippingCountryZoneBy2(): string {
  return `DELETE FROM shipping_country_zones WHERE shipping_zone_id = $1 AND country_id = $2`;
}

export function deleteShippingRate(): string {
  return `DELETE FROM shipping_rates WHERE shipping_zone_id = $1`;
}

export function deleteShippingRateById(): string {
  return `DELETE FROM shipping_rates WHERE id = $1`;
}
