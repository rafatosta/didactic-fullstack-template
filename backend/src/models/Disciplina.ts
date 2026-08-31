/** ÁREA DIDÁTICA: modelo do domínio. */
export interface Disciplina {
    id: number;
    nome: string;
    codigo: string;
    cargaHoraria: number;
}

export type NovaDisciplina = Omit<Disciplina, "id">;
