-- EXTENSIONS --
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLES --

CREATE TABLE IF NOT EXISTS staff_accounts (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(100) DEFAULT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  is_admin BOOLEAN DEFAULT FALSE,
  image TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES staff_accounts(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES staff_accounts(id) ON DELETE SET NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS categories (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES categories (id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  image TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES staff_accounts(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES staff_accounts(id) ON DELETE SET NULL,
  PRIMARY KEY (id)
);

CREATE INDEX idx_category_name ON categories (name);

CREATE TABLE IF NOT EXISTS products (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  product_name VARCHAR(255) NOT NULL,
  sku VARCHAR(255),
  sale_price NUMERIC NOT NULL DEFAULT 0,
  compare_price NUMERIC DEFAULT 0,
  buying_price NUMERIC DEFAULT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  short_description VARCHAR(165) NOT NULL,
  product_description TEXT NOT NULL,
  product_type VARCHAR(64) CHECK (product_type IN ('simple', 'variable')),
  published BOOLEAN DEFAULT FALSE,
  disable_out_of_stock BOOLEAN DEFAULT TRUE,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES staff_accounts(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES staff_accounts(id) ON DELETE SET NULL,
  CHECK (compare_price > sale_price OR compare_price = 0),
  PRIMARY KEY (id)
);

CREATE INDEX idx_product_publish ON products (published);

CREATE TABLE IF NOT EXISTS product_categories (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX idx_product_category ON product_categories (product_id, category_id);

CREATE TABLE IF NOT EXISTS gallery (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  image TEXT NOT NULL,
  is_thumbnail BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (id)
) PARTITION BY HASH(id);

CREATE INDEX idx_image_gallery ON gallery (product_id, is_thumbnail);

CREATE TABLE IF NOT EXISTS attributes (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  attribute_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES staff_accounts(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES staff_accounts(id) ON DELETE SET NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS attribute_values (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  attribute_id UUID REFERENCES attributes(id) ON DELETE CASCADE NOT NULL,
  attribute_value VARCHAR(255) NOT NULL,
  color VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX idx_attribute_values ON attribute_values (attribute_id);


CREATE TABLE IF NOT EXISTS product_attributes (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  attribute_id UUID REFERENCES attributes(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX idx_product_attribute_fk ON product_attributes (product_id, attribute_id);


CREATE TABLE IF NOT EXISTS product_attribute_values (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  product_attribute_id UUID REFERENCES product_attributes(id) ON DELETE CASCADE NOT NULL,
  attribute_value_id UUID REFERENCES attribute_values(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX idx_product_attribute_values_product_attribute_id ON product_attribute_values (product_attribute_id);
CREATE INDEX idx_product_attribute_values_attribute_value_id ON product_attribute_values (attribute_value_id);

CREATE TABLE IF NOT EXISTS variant_options (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image_id UUID REFERENCES gallery(id) ON DELETE SET NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  sale_price NUMERIC NOT NULL DEFAULT 0,
  compare_price NUMERIC DEFAULT 0,
  buying_price NUMERIC DEFAULT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  sku VARCHAR(255),
  active BOOLEAN DEFAULT TRUE,
  CHECK (compare_price > sale_price OR compare_price = 0),
  PRIMARY KEY (id)
);

CREATE INDEX idx_variant_options_product_id ON variant_options (product_id);

-- Means a product has 2 variants black/XL red/XL
CREATE TABLE IF NOT EXISTS variants (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  variant_option TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  variant_option_id UUID REFERENCES variant_options(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX idx_product_id_variants ON variants (product_id);
CREATE INDEX idx_variant_option_id_variants ON variants (variant_option_id);

CREATE TABLE IF NOT EXISTS variant_values (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  variant_id UUID REFERENCES variants(id) ON DELETE CASCADE NOT NULL,
  product_attribute_value_id UUID REFERENCES product_attribute_values(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX idx_variant_id_variant_values ON variant_values (variant_id);
CREATE INDEX idx_product_attribute_value_id_variant_values ON variant_values (product_attribute_value_id);

CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(50) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  address_line1 TEXT NOT NULL,
  city VARCHAR(255) NOT NULL,
  order_status VARCHAR(64) CHECK (order_status IN ('complete', 'pending', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES staff_accounts(id) ON DELETE SET NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
  unit_price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL,
  variant_option_id UUID REFERENCES variant_options(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE INDEX idx_product_id_order_item ON order_items (product_id);
CREATE INDEX idx_order_id_order_item ON order_items (order_id);

CREATE TABLE IF NOT EXISTS sells (
  id SERIAL NOT NULL,
  product_id UUID UNIQUE REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS slideshows (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  title VARCHAR(80),
  destination_url TEXT,
  image TEXT NOT NULL,
  description VARCHAR(160),
  btn_label VARCHAR(50),
  display_order INTEGER NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  clicks INTEGER NOT NULL DEFAULT 0,
  styles JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES staff_accounts(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES staff_accounts(id) ON DELETE SET NULL,
  PRIMARY KEY (id)
);

CREATE INDEX idx_slideshows_publish ON slideshows (published);

CREATE TABLE IF NOT EXISTS settings (
  id VARCHAR(50) NOT NULL,
  logo_image_path TEXT DEFAULT NULL,
  favicon_image_path TEXT DEFAULT NULL,
  store_name VARCHAR(255) DEFAULT NULL,
  store_email VARCHAR(255) DEFAULT NULL,
  store_number VARCHAR(255) DEFAULT NULL,
  max_checkout_quantity INTEGER DEFAULT NULL,
  currency JSONB,
  meta_title VARCHAR(150) DEFAULT NULL,
  meta_description TEXT DEFAULT NULL,
  meta_tags TEXT DEFAULT NULL,
  og_title VARCHAR(150) DEFAULT NULL,
  og_description TEXT DEFAULT NULL,
  og_image_path TEXT DEFAULT NULL,
  twitter_handle VARCHAR(150) DEFAULT NULL,
  socials JSONB DEFAULT NULL,
  google JSONB DEFAULT NULL,
  facebook JSONB DEFAULT NULL,
  PRIMARY KEY (id)
);

-- Default settings
INSERT INTO settings (id, store_number, store_email, store_name, max_checkout_quantity, currency, socials)
  VALUES ('store', '+212619080914', 'store@demo.com', 'My store', 10, '{
    "symbol": "$",
    "name": "US Dollar",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "USD",
    "name_plural": "US dollars"
  }', '
  {
    "items": [
    {
      "url": "https://www.facebook.com/",
      "icon": {"value": "FacebookIcon"}
    },
    {
      "url": "https://twitter.com/home",
      "icon": {"value": "TwitterIcon"}
    },
    {
      "url": "https://www.instagram.com/",
      "icon": {"value": "InstagramIcon"}
    }
  ]
  }');

-- FUNCTIONS --
CREATE OR REPLACE FUNCTION update_at_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
  END;
  $$ language 'plpgsql';

-- TRIGGERS --
CREATE TRIGGER category_set_update BEFORE UPDATE ON categories FOR EACH ROW EXECUTE PROCEDURE update_at_timestamp();
CREATE TRIGGER gallery_set_update BEFORE UPDATE ON gallery FOR EACH ROW EXECUTE PROCEDURE update_at_timestamp();
CREATE TRIGGER attribute_set_update BEFORE UPDATE ON attributes FOR EACH ROW EXECUTE PROCEDURE update_at_timestamp();
CREATE TRIGGER product_set_update BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_at_timestamp();
CREATE TRIGGER staff_set_update BEFORE UPDATE ON staff_accounts FOR EACH ROW EXECUTE PROCEDURE update_at_timestamp();
CREATE TRIGGER slideshow_set_update BEFORE UPDATE ON slideshows FOR EACH ROW EXECUTE PROCEDURE update_at_timestamp();

-- PARTIOTIONS --
CREATE TABLE gallery_part1 PARTITION OF gallery FOR VALUES WITH (modulus 3, remainder 0);
CREATE TABLE gallery_part2 PARTITION OF gallery FOR VALUES WITH (modulus 3, remainder 1);
CREATE TABLE gallery_part3 PARTITION OF gallery FOR VALUES WITH (modulus 3, remainder 2);

-- Permissions

CREATE USER crud_user WITH PASSWORD 'crud_password';
GRANT CONNECT ON DATABASE development TO crud_user;
GRANT USAGE ON SCHEMA public TO crud_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO crud_user;
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO crud_user;

-- DEFAULT DATA --
WITH att_id AS ( INSERT INTO attributes (attribute_name) VALUES ('Color'), ('Size') RETURNING * )
INSERT INTO attribute_values (attribute_id, attribute_value, color) VALUES
  (( SELECT id FROM att_id WHERE attribute_name = 'Color'), 'black', '#000'),
  (( SELECT id FROM att_id WHERE attribute_name = 'Color'), 'white', '#FFF'),
  (( SELECT id FROM att_id WHERE attribute_name = 'Color'), 'red', '#FF0000'),
  (( SELECT id FROM att_id WHERE attribute_name = 'Size'), 'S', null),
  (( SELECT id FROM att_id WHERE attribute_name = 'Size'), 'M', null),
  (( SELECT id FROM att_id WHERE attribute_name = 'Size'),'L', null),
  (( SELECT id FROM att_id WHERE attribute_name = 'Size'),'XL', null),
  (( SELECT id FROM att_id WHERE attribute_name = 'Size'),'2XL', null),
  (( SELECT id FROM att_id WHERE attribute_name = 'Size'),'3XL', null),
  (( SELECT id FROM att_id WHERE attribute_name = 'Size'),'4XL', null),
  (( SELECT id FROM att_id WHERE attribute_name = 'Size'), '5XL', null);

-- passowrd: admin
INSERT INTO staff_accounts (first_name, last_name, email, password_hash, active, is_admin)
  VALUES ('John', 'Doe', 'admin@gmail.com', '$2a$12$ZfUtPiuzFXNKhgeT6mOZ/.Hy6DOtNc1K4VIjcyIl6AaiUFGQaIKZK', true, true);
