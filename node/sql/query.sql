-- Table: public.lice_couting

-- DROP TABLE public.lice_couting;

CREATE TABLE public.lice_couting
(
    id integer NOT NULL DEFAULT nextval('lice_couting_lice_count_id_seq'::regclass),
    date timestamp without time zone NOT NULL,
    temperature integer,
    latitude numeric,
    longitude numeric,
    lice_count integer,
    location_name text COLLATE pg_catalog."default",
    CONSTRAINT unique_id PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.lice_couting
    OWNER to youruser;