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
  image TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES staff_accounts(id),
  updated_by UUID REFERENCES staff_accounts(id),
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
  created_by UUID REFERENCES staff_accounts(id),
  updated_by UUID REFERENCES staff_accounts(id),
  PRIMARY KEY (id)
);

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
  created_by UUID REFERENCES staff_accounts(id),
  updated_by UUID REFERENCES staff_accounts(id),
  CHECK (compare_price > sale_price OR compare_price = 0),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product_categories (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) NOT NULL,
  category_id UUID REFERENCES categories(id) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS gallery (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id),
  image TEXT NOT NULL,
  is_thumbnail BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (id)
) PARTITION BY HASH(id);

CREATE TABLE IF NOT EXISTS attributes (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  attribute_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES staff_accounts(id),
  updated_by UUID REFERENCES staff_accounts(id),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS attribute_values (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  attribute_id UUID REFERENCES attributes(id) NOT NULL,
  attribute_value VARCHAR(255) NOT NULL,
  color VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product_attributes (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) NOT NULL,
  attribute_id UUID REFERENCES attributes(id) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product_attribute_values (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  product_attribute_id UUID REFERENCES product_attributes(id) NOT NULL,
  attribute_value_id UUID REFERENCES attribute_values(id) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS variant_options (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image_id UUID REFERENCES gallery(id) ON DELETE SET NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  sale_price NUMERIC NOT NULL DEFAULT 0,
  compare_price NUMERIC DEFAULT 0,
  buying_price NUMERIC DEFAULT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  sku VARCHAR(255),
  active BOOLEAN DEFAULT TRUE,
  CHECK (compare_price > sale_price OR compare_price = 0),
  PRIMARY KEY (id)
);

-- Means a product has 2 variants black/XL red/XL
CREATE TABLE IF NOT EXISTS variants (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  variant_option TEXT NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  variant_option_id UUID REFERENCES variant_options(id) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS variant_values (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  variant_id UUID REFERENCES variants(id) NOT NULL,
  product_attribute_value_id UUID REFERENCES product_attribute_values(id) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS customers (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS customer_addresses (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id),
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  phone_number VARCHAR(255) NOT NULL,
  dial_code VARCHAR(100) NOT NULL,
  country VARCHAR(255) NOT NULL,
  postal_code VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(50) NOT NULL,
  customer_id UUID REFERENCES customers(id),
  order_approved_at TIMESTAMPTZ,
  order_delivered_carrier_date TIMESTAMPTZ,
  order_delivered_customer_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES staff_accounts(id),
  PRIMARY KEY (id) -- It's better to use Two-Phase Locking inside your transaction (SELECT ... FOR UPDATE) to prevent double booking problems for this table.
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id),
  order_id VARCHAR(50) REFERENCES orders(id),
  price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS sells (
  id SERIAL NOT NULL,
  product_id UUID UNIQUE REFERENCES products(id),
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
  created_by UUID REFERENCES staff_accounts(id),
  updated_by UUID REFERENCES staff_accounts(id),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS notifications (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES staff_accounts(id),
  title VARCHAR(100),
  content TEXT,
  seen BOOLEAN,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  receive_time TIMESTAMPTZ,
  notification_expiry_date DATE,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cards (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS card_items (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  card_id UUID REFERENCES cards(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS suppliers (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  supplier_name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone_number VARCHAR(255),
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city VARCHAR(255),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES staff_accounts(id),
  updated_by UUID REFERENCES staff_accounts(id),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product_suppliers (
  product_id UUID REFERENCES products(id) NOT NULL,
  supplier_id UUID REFERENCES suppliers(id) NOT NULL,
  PRIMARY KEY (product_id, supplier_id)
);

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
CREATE TRIGGER customer_set_update BEFORE UPDATE ON customers FOR EACH ROW EXECUTE PROCEDURE update_at_timestamp();
CREATE TRIGGER order_set_update BEFORE UPDATE ON orders FOR EACH ROW EXECUTE PROCEDURE update_at_timestamp();
CREATE TRIGGER slideshow_set_update BEFORE UPDATE ON slideshows FOR EACH ROW EXECUTE PROCEDURE update_at_timestamp();
CREATE TRIGGER notification_set_update BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE PROCEDURE update_at_timestamp();
CREATE TRIGGER suppliers_set_update BEFORE UPDATE ON suppliers FOR EACH ROW EXECUTE PROCEDURE update_at_timestamp();

-- PARTIOTIONS --
CREATE TABLE gallery_part1 PARTITION OF gallery FOR VALUES WITH (modulus 3, remainder 0);
CREATE TABLE gallery_part2 PARTITION OF gallery FOR VALUES WITH (modulus 3, remainder 1);
CREATE TABLE gallery_part3 PARTITION OF gallery FOR VALUES WITH (modulus 3, remainder 2);

-- INDEXES --
-- Declaration of a foreign key constraint does not automatically create an index on the referencing columns.

-- products
CREATE INDEX idx_product_publish ON products (published);
-- customers
CREATE INDEX idx_customer_email ON customers (email);
-- product_categories
CREATE INDEX idx_product_category ON product_categories (product_id, category_id);
-- gallery
CREATE INDEX idx_image_gallery ON gallery (product_id, is_thumbnail);
-- attribute_values
CREATE INDEX idx_attribute_values ON attribute_values (attribute_id);
-- product_attribute_values
CREATE INDEX idx_product_attribute_values_product_attribute_id ON product_attribute_values (product_attribute_id);
CREATE INDEX idx_product_attribute_values_attribute_value_id ON product_attribute_values (attribute_value_id);
-- product_attributes
CREATE INDEX idx_product_attribute_fk ON product_attributes (product_id, attribute_id);
-- variants
CREATE INDEX idx_product_id_variants ON variants (product_id);
CREATE INDEX idx_variant_option_id_variants ON variants (variant_option_id);
-- variant_values
CREATE INDEX idx_variant_id_variant_values ON variant_values (variant_id);
CREATE INDEX idx_product_attribute_value_id_variant_values ON variant_values (product_attribute_value_id);
-- orders
CREATE INDEX idx_order_customer_id ON orders (customer_id);
-- order_items
CREATE INDEX idx_product_id_order_item ON order_items (product_id);
CREATE INDEX idx_order_id_order_item ON order_items (order_id);
-- cards
CREATE INDEX idx_customer_id_card ON cards (customer_id);
-- slideshows
CREATE INDEX idx_slideshows_publish ON slideshows (published);
-- product_suppliers
CREATE INDEX idx_product_supplier ON product_suppliers (product_id, supplier_id);
-- variant_options
CREATE INDEX idx_variant_options_product_id ON variant_options (product_id);

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