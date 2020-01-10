DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id serial primary key,
    data jsonb
);
 CREATE INDEX two_column_index on products (id, data);

