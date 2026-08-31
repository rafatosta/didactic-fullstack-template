-- IMPLEMENTAÇÃO DE REFERÊNCIA
-- Dados locais para validar a aplicação completa.

INSERT INTO universidade (nome) VALUES
    ('Universidade do Sertão'),
    ('Instituto Tecnológico Regional');

INSERT INTO disciplina (nome, codigo, carga_horaria) VALUES
    ('Programação Orientada a Objetos', 'POO101', 60),
    ('Banco de Dados', 'BD101', 60),
    ('Desenvolvimento Web', 'WEB101', 60);

INSERT INTO aluno (nome, matricula, email, universidade_id) VALUES
    ('Ana Silva', '20260001', 'ana@example.test', 1),
    ('Bruno Souza', '20260002', 'bruno@example.test', 1),
    ('Carla Lima', '20260003', 'carla@example.test', 2);

INSERT INTO aluno_disciplina (aluno_id, disciplina_id) VALUES
    (1, 1), (1, 2),
    (2, 1), (2, 3),
    (3, 2);
