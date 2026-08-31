/** INFRAESTRUTURA: inicialização HTTP da aplicação. */
import Fastify from "fastify";
import { AlunoDAO } from "./dao/AlunoDAO.js";
import { DisciplinaDAO } from "./dao/DisciplinaDAO.js";
import { UniversidadeDAO } from "./dao/UniversidadeDAO.js";
import type { NovoAluno } from "./models/Aluno.js";
import type { NovaDisciplina } from "./models/Disciplina.js";
import type { NovaUniversidade } from "./models/Universidade.js";
import { registerCrudRoutes } from "./routes/crudRoutes.js";

const app = Fastify({ logger: true });

app.get("/api/health", async () => ({ status: "ok" }));

registerCrudRoutes<NovaUniversidade, ReturnType<UniversidadeDAO["listar"]>[number]>(
    app,
    "universidades",
    new UniversidadeDAO(),
);
registerCrudRoutes<NovaDisciplina, ReturnType<DisciplinaDAO["listar"]>[number]>(
    app,
    "disciplinas",
    new DisciplinaDAO(),
);
registerCrudRoutes<NovoAluno, ReturnType<AlunoDAO["listar"]>[number]>(app, "alunos", new AlunoDAO());

app.setErrorHandler((error, _request, reply) => {
    app.log.error(error);
    const message = error instanceof Error ? error.message : "Erro inesperado";
    reply.code(400).send({ message });
});

await app.listen({ port: 3000, host: "127.0.0.1" });
