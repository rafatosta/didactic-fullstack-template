/** ÁREA DIDÁTICA: DAO e SQL da entidade Aluno, incluindo 1:N e N:N. */
import { BaseDAO } from "../framework/BaseDAO.js";
import type { Aluno, NovoAluno } from "../models/Aluno.js";

type AlunoRow = {
    id: number;
    nome: string;
    matricula: string;
    email: string;
    universidade_id: number;
};

type DisciplinaIdRow = { disciplina_id: number };

export class AlunoDAO extends BaseDAO<Aluno> {
    listar(): Aluno[] {
        const rows = this.query(
            `SELECT id, nome, matricula, email, universidade_id
             FROM aluno
             ORDER BY nome`,
        ) as unknown as AlunoRow[];
        return rows.map((row) => this.mapear(row));
    }

    buscarPorId(id: number): Aluno | null {
        const row = (this.query(
            `SELECT id, nome, matricula, email, universidade_id
             FROM aluno WHERE id = ?`,
            [id],
        ) as unknown as AlunoRow[])[0];
        return row ? this.mapear(row) : null;
    }

    inserir(aluno: NovoAluno): Aluno {
        const result = this.execute(
            `INSERT INTO aluno (nome, matricula, email, universidade_id)
             VALUES (?, ?, ?, ?)`,
            [aluno.nome, aluno.matricula, aluno.email, aluno.universidadeId],
        );
        const id = Number(result.lastInsertRowid);
        this.salvarDisciplinas(id, aluno.disciplinaIds);
        return this.buscarPorId(id)!;
    }

    atualizar(id: number, aluno: NovoAluno): Aluno | null {
        const result = this.execute(
            `UPDATE aluno
             SET nome = ?, matricula = ?, email = ?, universidade_id = ?
             WHERE id = ?`,
            [aluno.nome, aluno.matricula, aluno.email, aluno.universidadeId, id],
        );
        if (!result.changes) return null;
        this.salvarDisciplinas(id, aluno.disciplinaIds);
        return this.buscarPorId(id);
    }

    excluir(id: number): boolean {
        return this.execute("DELETE FROM aluno WHERE id = ?", [id]).changes > 0;
    }

    private mapear(row: AlunoRow): Aluno {
        const disciplinas = this.query(
            "SELECT disciplina_id FROM aluno_disciplina WHERE aluno_id = ? ORDER BY disciplina_id",
            [row.id],
        ) as unknown as DisciplinaIdRow[];
        return {
            id: row.id,
            nome: row.nome,
            matricula: row.matricula,
            email: row.email,
            universidadeId: row.universidade_id,
            disciplinaIds: disciplinas.map((item) => item.disciplina_id),
        };
    }

    private salvarDisciplinas(alunoId: number, disciplinaIds: number[]): void {
        this.execute("DELETE FROM aluno_disciplina WHERE aluno_id = ?", [alunoId]);
        for (const disciplinaId of disciplinaIds) {
            this.execute(
                "INSERT INTO aluno_disciplina (aluno_id, disciplina_id) VALUES (?, ?)",
                [alunoId, disciplinaId],
            );
        }
    }
}
