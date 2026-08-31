/** ÁREA DIDÁTICA: DAO e SQL da entidade Disciplina. */
import { BaseDAO } from "../framework/BaseDAO.js";
import type { Disciplina, NovaDisciplina } from "../models/Disciplina.js";

type DisciplinaRow = { id: number; nome: string; codigo: string; carga_horaria: number };

export class DisciplinaDAO extends BaseDAO<Disciplina> {
    listar(): Disciplina[] {
        return this.queryRows("SELECT id, nome, codigo, carga_horaria FROM disciplina ORDER BY nome");
    }

    buscarPorId(id: number): Disciplina | null {
        const rows = this.queryRows("SELECT id, nome, codigo, carga_horaria FROM disciplina WHERE id = ?", [id]);
        return rows[0] ?? null;
    }

    inserir(disciplina: NovaDisciplina): Disciplina {
        const result = this.execute(
            "INSERT INTO disciplina (nome, codigo, carga_horaria) VALUES (?, ?, ?)",
            [disciplina.nome, disciplina.codigo, disciplina.cargaHoraria],
        );
        return this.buscarPorId(Number(result.lastInsertRowid))!;
    }

    atualizar(id: number, disciplina: NovaDisciplina): Disciplina | null {
        const result = this.execute(
            "UPDATE disciplina SET nome = ?, codigo = ?, carga_horaria = ? WHERE id = ?",
            [disciplina.nome, disciplina.codigo, disciplina.cargaHoraria, id],
        );
        return result.changes ? this.buscarPorId(id) : null;
    }

    excluir(id: number): boolean {
        return this.execute("DELETE FROM disciplina WHERE id = ?", [id]).changes > 0;
    }

    private queryRows(sql: string, params: unknown[] = []): Disciplina[] {
        const rows = this.query(sql, params) as unknown as DisciplinaRow[];
        return rows.map((row) => ({
            id: row.id,
            nome: row.nome,
            codigo: row.codigo,
            cargaHoraria: row.carga_horaria,
        }));
    }
}
