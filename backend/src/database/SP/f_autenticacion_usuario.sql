CREATE OR REPLACE FUNCTION f_autenticacion_usuario(in_json_txt JSON)
RETURNS SETOF v2000_usuarios_info AS
$BODY$
DECLARE
    r v2000_usuarios_info%rowtype;
	v_error_stack text;
    v_email text;
    v_clave text;

BEGIN
    SELECT email 
        INTO v_email 
        FROM json_to_record(in_json_txt) 
            AS x(email text);
    SELECT MD5(clave)
        INTO v_clave 
        FROM json_to_record(in_json_txt) 
            AS x(clave text);

        FOR r IN 

            SELECT * FROM v2000_usuarios_info
            WHERE   f_email = v_email
            AND     f_clave = v_clave

            LOOP
            RETURN NEXT r;
        END LOOP;
        RETURN;

	EXCEPTION WHEN OTHERS THEN
	GET STACKED DIAGNOSTICS v_error_stack = PG_EXCEPTION_CONTEXT;

    RAISE WARNING 'The stack trace of the error is: "%"', v_error_stack;
END
$BODY$ LANGUAGE 'plpgsql'

