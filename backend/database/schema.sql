-- ÁREA DIDÁTICA
-- Estrutura SQL do domínio de referência.

PRAGMA foreign_keys = ON;

CREATE TABLE universidade (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
);

CREATE TABLE disciplina (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    codigo TEXT NOT NULL UNIQUE,
    carga_horaria INTEGER NOT NULL CHECK (carga_horaria > 0)
);

CREATE TABLE aluno (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    matricula TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    universidade_id INTEGER NOT NULL,
    FOREIGN KEY (universidade_id) REFERENCES universidade(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE aluno_disciplina (
    aluno_id INTEGER NOT NULL,
    disciplina_id INTEGER NOT NULL,
    PRIMARY KEY (aluno_id, disciplina_id),
    FOREIGN KEY (aluno_id) REFERENCES aluno(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplina(id) ON DELETE CASCADE
);
