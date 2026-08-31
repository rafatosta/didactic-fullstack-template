/** ÁREA DIDÁTICA: modelo transportado do backend para o frontend. */
export interface Disciplina {
    id: number;
    nome: string;
    codigo: string;
    cargaHoraria: number;
}

export type NovaDisciplina = Omit<Disciplina, "id">;
