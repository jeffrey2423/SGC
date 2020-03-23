CREATE OR REPLACE FUNCTION f_validar_usuario_db(in_email_text text) RETURNS integer
    AS
$BODY$
	DECLARE
		err_context text;
        v_err_code integer := 0; /*0 no existe, 1 existe*/

BEGIN
 	IF (SELECT f_validar_email(in_email_text)) THEN
    
        SELECT 1 INTO v_err_code
        FROM users
        WHERE email = in_email_text;
		
		IF( v_err_code ISNULL) THEN
			v_err_code := 0;
		END IF;
			
        
	ELSE
		v_err_code := 9999;
    END IF;

    RETURN v_err_code;

    EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
        RAISE INFO 'Error Name:%',SQLERRM;
        RAISE INFO 'Error State:%', SQLSTATE;
        RAISE INFO 'Error Context:%', err_context;

END
$BODY$ LANGUAGE 'plpgsql'