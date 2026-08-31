import { describe, expect, it } from "vitest";
import { AlunoDAO } from "../../src/dao/AlunoDAO.js";
import { DisciplinaDAO } from "../../src/dao/DisciplinaDAO.js";
import { UniversidadeDAO } from "../../src/dao/UniversidadeDAO.js";

describe("DAOs didáticos", () => {
  it("executa CRUD de universidade", () => {
    const dao = new UniversidadeDAO();
    const created = dao.inserir({ nome: "Universidade Teste" });
    expect(created.id).toBeTypeOf("number");
    expect(dao.buscarPorId(created.id)?.nome).toBe("Universidade Teste");
    expect(dao.atualizar(created.id, { nome: "Universidade Atualizada" })?.nome).toBe("Universidade Atualizada");
    expect(dao.excluir(created.id)).toBe(true);
    expect(dao.buscarPorId(created.id)).toBeNull();
  });

  it("executa CRUD de disciplina", () => {
    const dao = new DisciplinaDAO();
    const created = dao.inserir({ nome: "Teste", codigo: "TST001", cargaHoraria: 60 });
    expect(created.codigo).toBe("TST001");
    expect(dao.atualizar(created.id, { nome: "Teste 2", codigo: "TST002", cargaHoraria: 80 })?.cargaHoraria).toBe(80);
    expect(dao.excluir(created.id)).toBe(true);
  });

  it("persiste relacionamento Aluno -> Universidade e Aluno <-> Disciplina", () => {
    const universidades = new UniversidadeDAO();
    const disciplinas = new DisciplinaDAO();
    const alunos = new AlunoDAO();

    const universidade = universidades.inserir({ nome: "Universidade Relacionamento" });
    const d1 = disciplinas.inserir({ nome: "POO", codigo: "POO", cargaHoraria: 60 });
    const d2 = disciplinas.inserir({ nome: "BD", codigo: "BD", cargaHoraria: 60 });

    const aluno = alunos.inserir({
      nome: "Aluno Teste",
      matricula: `MAT-${Date.now()}`,
      email: `teste-${Date.now()}@example.com`,
      universidadeId: universidade.id,
      disciplinaIds: [d1.id, d2.id],
    });

    expect(aluno.universidadeId).toBe(universidade.id);
    expect(aluno.disciplinaIds).toEqual([d1.id, d2.id].sort((a, b) => a - b));

    const updated = alunos.atualizar(aluno.id, {
      nome: aluno.nome,
      matricula: aluno.matricula,
      email: aluno.email,
      universidadeId: universidade.id,
      disciplinaIds: [d2.id],
    });
    expect(updated?.disciplinaIds).toEqual([d2.id]);
    expect(alunos.excluir(aluno.id)).toBe(true);
  });
});
