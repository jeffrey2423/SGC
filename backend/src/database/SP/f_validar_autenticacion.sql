CREATE OR REPLACE FUNCTION f_validar_autenticacion(in_json_txt JSON)
    RETURNS integer
    AS
    $BODY$
        DECLARE
            err_context TEXT;
            v_err_code INTEGER := 0; /*0 no existe, 1 existe y activo, 2 no activo*/
            v_email TEXT;
            v_clave TEXT;
            v_activo INTEGER;         

    BEGIN
	
	   SELECT email 
            INTO v_email 
            FROM json_to_record(in_json_txt) 
                AS x(email text);

        SELECT MD5(clave)
            INTO v_clave 
            FROM json_to_record(in_json_txt) 
                AS x(clave text);

        SELECT f1004_ind_activo
            INTO v_activo
            FROM t1004_usuarios
            WHERE   f1004_email = v_email
            AND     f1004_clave = v_clave;
        
        IF EXISTS (
            SELECT  1 
            FROM    t1004_usuarios
            WHERE   f1004_email = v_email
            AND     f1004_clave = v_clave

        ) THEN
        
            IF (v_activo = 1) THEN
                v_err_code := 1;
            ELSE
                v_err_code := 2; 
            END IF;
            
        ELSE
            v_err_code := 0;
        END IF;

        RETURN v_err_code;

        EXCEPTION WHEN OTHERS THEN
            GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
            RAISE INFO 'Error Name:%',SQLERRM;
            RAISE INFO 'Error State:%', SQLSTATE;
            RAISE INFO 'Error Context:%', err_context;

    END
$BODY$ LANGUAGE 'plpgsql'