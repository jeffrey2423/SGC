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