/** ÁREA DIDÁTICA: DAO e SQL da entidade Universidade. */
import { BaseDAO } from "../framework/BaseDAO.js";
import type { NovaUniversidade, Universidade } from "../models/Universidade.js";

export class UniversidadeDAO extends BaseDAO<Universidade> {
    listar(): Universidade[] {
        return this.query("SELECT id, nome FROM universidade ORDER BY nome");
    }

    buscarPorId(id: number): Universidade | null {
        return this.queryOne("SELECT id, nome FROM universidade WHERE id = ?", [id]);
    }

    inserir(universidade: NovaUniversidade): Universidade {
        const result = this.execute("INSERT INTO universidade (nome) VALUES (?)", [universidade.nome]);
        return this.buscarPorId(Number(result.lastInsertRowid))!;
    }

    atualizar(id: number, universidade: NovaUniversidade): Universidade | null {
        const result = this.execute("UPDATE universidade SET nome = ? WHERE id = ?", [universidade.nome, id]);
        return result.changes ? this.buscarPorId(id) : null;
    }

    excluir(id: number): boolean {
        return this.execute("DELETE FROM universidade WHERE id = ?", [id]).changes > 0;
    }
}
