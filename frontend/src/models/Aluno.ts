/** ÁREA DIDÁTICA: modelo transportado do backend para o frontend. */
export interface Aluno {
    id: number;
    nome: string;
    matricula: string;
    email: string;
    universidadeId: number;
    disciplinaIds: number[];
}

export type NovoAluno = Omit<Aluno, "id">;
