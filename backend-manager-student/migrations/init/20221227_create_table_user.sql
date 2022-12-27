CREATE TABLE public.user (
    id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_flg boolean DEFAULT false NOT NULL,
    name text NOT NULL,
    mssv text NOT NULL,
    avatar_uri text,
    phone_number text NOT NULL,
    email text,
    birthday date,
    address text,
    gender smallint,
    status smallint DEFAULT '1'::smallint,
    province_id integer,
    district_id integer,
    avatar_uri_temp text
);
