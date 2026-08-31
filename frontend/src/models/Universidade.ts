/** ÁREA DIDÁTICA: modelo transportado do backend para o frontend. */
export interface Universidade {
    id: number;
    nome: string;
}

export type NovaUniversidade = Omit<Universidade, "id">;
