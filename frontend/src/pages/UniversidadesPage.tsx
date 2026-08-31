/** ÁREA DIDÁTICA / REFERÊNCIA: página CRUD completa de Universidade. */
import { useState, type FormEvent } from "react";
import { universidadesApi } from "../framework/resources";
import { useCrud } from "../framework/useCrud";
import type { NovaUniversidade, Universidade } from "../models/Universidade";

export function UniversidadesPage() {
    const crud = useCrud(universidadesApi);
    const [editing, setEditing] = useState<Universidade | null>(null);
    const [nome, setNome] = useState("");

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        const data: NovaUniversidade = { nome };
        if (editing) await crud.atualizar(editing.id, data);
        else await crud.criar(data);
        setEditing(null);
        setNome("");
    };

    const edit = (item: Universidade) => {
        setEditing(item);
        setNome(item.nome);
    };

    return <CrudLayout title="Universidades" loading={crud.loading} error={crud.error}>
        <form onSubmit={submit} className="mb-6 flex gap-2 rounded-xl bg-white p-4 shadow-sm">
            <input required value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome da universidade" className="flex-1 rounded-lg border px-3 py-2" />
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-white">{editing ? "Salvar" : "Cadastrar"}</button>
        </form>
        <Table headers={["Nome", "Ações"]}>
            {crud.items.map((item) => <tr key={item.id} className="border-t">
                <td className="p-3">{item.nome}</td>
                <td className="p-3"><Actions onEdit={() => edit(item)} onDelete={() => void crud.excluir(item.id)} /></td>
            </tr>)}
        </Table>
    </CrudLayout>;
}

export function CrudLayout({ title, loading, error, children }: { title: string; loading: boolean; error: string | null; children: React.ReactNode }) {
    return <section><h1 className="mb-6 text-3xl font-bold">{title}</h1>{error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}{loading ? <p>Carregando...</p> : children}</section>;
}

export function Table({ headers, children }: { headers: string[]; children: React.ReactNode }) {
    return <div className="overflow-hidden rounded-xl bg-white shadow-sm"><table className="w-full"><thead className="bg-slate-100"><tr>{headers.map((header) => <th key={header} className="p-3 text-left text-sm font-semibold">{header}</th>)}</tr></thead><tbody>{children}</tbody></table></div>;
}

export function Actions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
    return <div className="flex gap-3"><button type="button" onClick={onEdit} className="text-blue-700">Editar</button><button type="button" onClick={onDelete} className="text-red-700">Excluir</button></div>;
}
