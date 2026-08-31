/** INFRAESTRUTURA: registra rotas CRUD sem expor detalhes HTTP aos DAOs. */
import type { FastifyInstance } from "fastify";

type CrudAdapter<TCreate, TEntity> = {
    listar(): TEntity[];
    buscarPorId(id: number): TEntity | null;
    inserir(data: TCreate): TEntity;
    atualizar(id: number, data: TCreate): TEntity | null;
    excluir(id: number): boolean;
};

export function registerCrudRoutes<TCreate, TEntity>(
    app: FastifyInstance,
    resource: string,
    dao: CrudAdapter<TCreate, TEntity>,
): void {
    app.get(`/api/${resource}`, async () => dao.listar());

    app.get<{ Params: { id: string } }>(`/api/${resource}/:id`, async (request, reply) => {
        const entity = dao.buscarPorId(Number(request.params.id));
        return entity ?? reply.code(404).send({ message: "Registro não encontrado" });
    });

    app.post<{ Body: TCreate }>(`/api/${resource}`, async (request, reply) => {
        // O Fastify 5 normaliza genericamente o Body com tipos internos.
        // Na fronteira HTTP, restauramos o tipo declarado pela própria rota.
        const body = request.body as TCreate;
        return reply.code(201).send(dao.inserir(body));
    });

    app.put<{ Params: { id: string }; Body: TCreate }>(`/api/${resource}/:id`, async (request, reply) => {
        const body = request.body as TCreate;
        const entity = dao.atualizar(Number(request.params.id), body);
        return entity ?? reply.code(404).send({ message: "Registro não encontrado" });
    });

    app.delete<{ Params: { id: string } }>(`/api/${resource}/:id`, async (request, reply) => {
        if (!dao.excluir(Number(request.params.id))) {
            return reply.code(404).send({ message: "Registro não encontrado" });
        }
        return reply.code(204).send();
    });
}
