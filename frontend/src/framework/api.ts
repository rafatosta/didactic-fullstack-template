/** INFRAESTRUTURA: encapsula Fetch, JSON, métodos HTTP e erros. */
async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const headers = new Headers(options.headers);

    if (options.body != null && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Erro na API" }));
        throw new Error(error.message ?? "Erro na API");
    }

    if (response.status === 204) return undefined as T;
    return response.json() as Promise<T>;
}

export type CrudApi<TEntity, TCreate> = {
    listar(): Promise<TEntity[]>;
    buscar(id: number): Promise<TEntity>;
    criar(data: TCreate): Promise<TEntity>;
    atualizar(id: number, data: TCreate): Promise<TEntity>;
    excluir(id: number): Promise<void>;
};

export function createCrudApi<TEntity, TCreate>(resource: string): CrudApi<TEntity, TCreate> {
    const base = `/api/${resource}`;
    return {
        listar: () => request<TEntity[]>(base),
        buscar: (id) => request<TEntity>(`${base}/${id}`),
        criar: (data) => request<TEntity>(base, { method: "POST", body: JSON.stringify(data) }),
        atualizar: (id, data) => request<TEntity>(`${base}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
        excluir: (id) => request<void>(`${base}/${id}`, { method: "DELETE" }),
    };
}
