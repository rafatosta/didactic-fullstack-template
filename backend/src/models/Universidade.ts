/** ÁREA DIDÁTICA: modelo do domínio. */
export interface Universidade {
    id: number;
    nome: string;
}

export type NovaUniversidade = Omit<Universidade, "id">;
