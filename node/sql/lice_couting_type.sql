
CREATE TABLE lice_type_count (
        lice_type_count_id  serial primary key ,
        kh integer not null CHECK (kh >= 0),
        lb integer not null CHECK (lb >= 0),
        sl integer not null CHECK (sl >= 0),
        fs integer not null CHECK (fs >= 0),
        sb integer not null CHECK (sb >= 0)
);

