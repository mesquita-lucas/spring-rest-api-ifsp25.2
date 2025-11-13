ALTER TABLE conserto
    ADD COLUMN ativo TINYINT;

UPDATE conserto
    SET ativo = 1;