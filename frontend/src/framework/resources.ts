/** INFRAESTRUTURA DE REFERÊNCIA: CRUDs prontos para cada recurso da API. */
import type { Aluno, NovoAluno } from "../models/Aluno";
import type { Disciplina, NovaDisciplina } from "../models/Disciplina";
import type { NovaUniversidade, Universidade } from "../models/Universidade";
import { createCrudApi } from "./api";

export const alunosApi = createCrudApi<Aluno, NovoAluno>("alunos");
export const disciplinasApi = createCrudApi<Disciplina, NovaDisciplina>("disciplinas");
export const universidadesApi = createCrudApi<Universidade, NovaUniversidade>("universidades");
