-- ingredient --

CREATE TABLE
  public.ingredient (id serial NOT NULL, name text NULL);

ALTER TABLE
  public.ingredient
ADD
  CONSTRAINT ingredient_pkey PRIMARY KEY (id);

-- recipe --

CREATE TABLE
  public.recipe (
    id serial NOT NULL,
    user_id integer NOT NULL,
    name text NOT NULL,
    description text NULL,
    steps text NULL,
    image_url text NULL,
    created_at timestamp without time zone NULL DEFAULT now(),
    updated_at timestamp without time zone NULL DEFAULT now()
  );

ALTER TABLE
  public.recipe
ADD
  CONSTRAINT recipe_pkey PRIMARY KEY (id);

-- recipe_ingredient --

CREATE TABLE
  public.recipe_ingredient (
    id serial NOT NULL,
    recipe_id integer NOT NULL,
    ingredient_id integer NOT NULL,
    quantity numeric NULL,
    unit text NULL
  );

ALTER TABLE
  public.recipe_ingredient
ADD
  CONSTRAINT recipe_ingredient_pkey PRIMARY KEY (id);

-- role --

CREATE TABLE
  public.role (
    id serial NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    name character varying(255) NULL
  );

ALTER TABLE
  public.role
ADD
  CONSTRAINT role_pkey PRIMARY KEY (id);

-- user --

CREATE TABLE
  public."user" (
    id serial NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    name character varying(255) NULL,
    email character varying(255) NULL,
    username character varying(255) NULL,
    password character varying(255) NULL,
    updated_at timestamp without time zone NULL
  );

ALTER TABLE
  public."user"
ADD
  CONSTRAINT user_pkey PRIMARY KEY (id);

-- user_role --

CREATE TABLE
  public.user_role (
    id serial NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    user_id integer NULL,
    role_id integer NULL
  );

ALTER TABLE
  public.user_role
ADD
  CONSTRAINT user_role_pkey PRIMARY KEY (id);