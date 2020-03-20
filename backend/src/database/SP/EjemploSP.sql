CREATE DATABASE postgres_node_api;

USE postgres_node_api;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(250),
  clave VARCHAR(250),
  rol VARCHAR(250)
);

CREATE OR REPLACE FUNCTION f_get_users()
RETURNS SETOF users AS
$BODY$
DECLARE
    reg RECORD;
	v_error_stack text;
BEGIN
    FOR REG IN SELECT * FROM users LOOP
       RETURN NEXT reg;
    END LOOP;
    RETURN;
	
	EXCEPTION WHEN OTHERS THEN
	GET STACKED DIAGNOSTICS v_error_stack = PG_EXCEPTION_CONTEXT;

    RAISE WARNING 'The stack trace of the error is: "%"', v_error_stack;
END
$BODY$ LANGUAGE 'plpgsql'


insert into users
(nombre, clave, rol)
values(
	'jeffrey',
	md5('123'),
	'admin'
);

select * from f_get_users()