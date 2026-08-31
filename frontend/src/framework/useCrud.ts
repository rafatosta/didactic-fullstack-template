/** INFRAESTRUTURA: estado e chamadas CRUD compartilhados pelas páginas. */
import { useCallback, useEffect, useState } from "react";
import type { CrudApi } from "./api";

export function useCrud<TEntity extends { id: number }, TCreate>(api: CrudApi<TEntity, TCreate>) {
    const [items, setItems] = useState<TEntity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const recarregar = useCallback(async () => {
        setLoading(true);
        try {
            setItems(await api.listar());
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro inesperado");
        } finally {
            setLoading(false);
        }
    }, [api]);

    useEffect(() => {
        void recarregar();
    }, [recarregar]);

    const criar = async (data: TCreate) => {
        await api.criar(data);
        await recarregar();
    };

    const atualizar = async (id: number, data: TCreate) => {
        await api.atualizar(id, data);
        await recarregar();
    };

    const excluir = async (id: number) => {
        await api.excluir(id);
        await recarregar();
    };

    return { items, loading, error, criar, atualizar, excluir, recarregar };
}
