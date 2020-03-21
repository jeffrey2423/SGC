CREATE OR REPLACE FUNCTION insert_from_json(in_json_txt json) RETURNS void
    AS 
$BODY$
DECLARE
    v_error_stack text;

    BEGIN
        CREATE TABLE IF NOT EXISTS t_temp_json_data(
            id          SERIAL NOT NULL PRIMARY KEY,
            extra_info  JSON
        );

        INSERT INTO t_temp_json_data(extra_info)
        VALUES(
           in_json_txt 
        );

    INSERT INTO users(
        nombre,
        clave,
        rol
    )SELECT
        extra_info->>'nombre' AS nombre,
        md5(extra_info->>'clave') AS clave,
        extra_info->>'rol' AS rol
    FROM t_temp_json_data;

	EXCEPTION WHEN OTHERS THEN
	GET STACKED DIAGNOSTICS v_error_stack = PG_EXCEPTION_CONTEXT;

    RAISE WARNING 'The stack trace of the error is: "%"', v_error_stack;

    DROP TABLE t_temp_json_data;
END 
$BODY$ LANGUAGE 'plpgsql'



/*
ASI SE LLAMA

SELECT insert_from_json('{"nombre":"jeffreyPRUEBA","clave":"5555","rol":"rollPRUEBA"}')

select * from users*/