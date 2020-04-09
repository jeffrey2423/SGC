CREATE OR REPLACE FUNCTION f_obtener_usuarios()
RETURNS SETOF t1004_usuarios AS
$BODY$
DECLARE
    reg RECORD;
	v_error_stack text;
BEGIN
    FOR REG IN SELECT * FROM t1004_usuarios LOOP
       RETURN NEXT reg;
    END LOOP;
    RETURN;
	
	EXCEPTION WHEN OTHERS THEN
	GET STACKED DIAGNOSTICS v_error_stack = PG_EXCEPTION_CONTEXT;

    RAISE WARNING 'The stack trace of the error is: "%"', v_error_stack;
END
$BODY$ LANGUAGE 'plpgsql'