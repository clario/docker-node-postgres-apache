-- Table: public.lice_couting

-- DROP TABLE public.lice_couting;

CREATE TABLE public.lice_couting
(
    id serial NOT NULL,
    registred_timestamp timestamp without time zone NOT NULL DEFAULT NOW(),
    client_timestamp timestamp without time zone NOT NULL,
    temperature numeric,
    count_number integer,
    lice_type_count_id integer references lice_type_count(lice_type_count_id) NOT NULL,
    location_name text COLLATE pg_catalog."default",
    user_name text
    CONSTRAINT unique_id PRIMARY KEY (id)
   
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.lice_couting
    OWNER to youruser;x