/** ÁREA DIDÁTICA: modelo do domínio e seus relacionamentos. */
export interface Aluno {
    id: number;
    nome: string;
    matricula: string;
    email: string;
    universidadeId: number;
    disciplinaIds: number[];
}

export type NovoAluno = Omit<Aluno, "id">;
