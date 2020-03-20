CREATE FUNCTION insert_from_json(in_json_txt json) RETURNS void
    LANGUAGE plpgsql
    AS 
    $BODY$
DECLARE
    reg RECORD;
    v_error_stack text;

BEGIN
    INSERT INTO
        table_name (name, age)
    SELECT
        (rec ->> 'name') :: text,
        (rec ->> 'age') :: integer
    FROM
        json_array_elements(in_json_txt -> 'data') rec

END 
$ BODY $ LANGUAGE 'plpgsql'