CREATE OR REPLACE FUNCTION f_insertar_usuario(in_json_txt json) RETURNS void
    AS
$BODY$
	DECLARE
		err_context text;

    BEGIN
		WITH json_data(datajson) as 
		(
			values(
				in_json_txt
			)
		)

    INSERT INTO users(
        nombre,
        clave,
        rol
    )SELECT
        datajson->>'nombre' AS nombre,
        md5(datajson->>'clave') AS clave,
        datajson->>'rol' AS rol
    FROM json_data;

EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
        RAISE INFO 'Error Name:%',SQLERRM;
        RAISE INFO 'Error State:%', SQLSTATE;
        RAISE INFO 'Error Context:%', err_context;

END
$BODY$ LANGUAGE 'plpgsql'

/*select f_insert_user_from_json('{"nombre":"jeff","clave":"5555","rol":"jeff"}');
select * from users;*/