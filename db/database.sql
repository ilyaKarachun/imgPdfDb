-- CREATE DATABASE hospitalDB WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';

-- ALTER DATABASE ivashin OWNER TO postgres;

-- BEGIN;

CREATE TABLE IF NOT EXISTS public.user
(
  email VARCHAR(255) NOT NULL PRIMARY KEY,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  password VARCHAR(255),
  image TEXT,
  pdf BYTEA
);

-- COMMIT;
