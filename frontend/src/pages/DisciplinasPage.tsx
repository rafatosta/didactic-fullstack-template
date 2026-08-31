/** ÁREA DIDÁTICA / REFERÊNCIA: página CRUD completa de Disciplina. */
import { useState, type FormEvent } from "react";
import { disciplinasApi } from "../framework/resources";
import { useCrud } from "../framework/useCrud";
import type { Disciplina, NovaDisciplina } from "../models/Disciplina";
import { Actions, CrudLayout, Table } from "./UniversidadesPage";

const empty: NovaDisciplina = { nome: "", codigo: "", cargaHoraria: 60 };

export function DisciplinasPage() {
    const crud = useCrud(disciplinasApi);
    const [editing, setEditing] = useState<Disciplina | null>(null);
    const [form, setForm] = useState<NovaDisciplina>(empty);

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        if (editing) await crud.atualizar(editing.id, form);
        else await crud.criar(form);
        setEditing(null);
        setForm(empty);
    };

    const edit = (item: Disciplina) => {
        setEditing(item);
        setForm({ nome: item.nome, codigo: item.codigo, cargaHoraria: item.cargaHoraria });
    };

    return <CrudLayout title="Disciplinas" loading={crud.loading} error={crud.error}>
        <form onSubmit={submit} className="mb-6 grid gap-3 rounded-xl bg-white p-4 shadow-sm md:grid-cols-4">
            <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Nome" className="rounded-lg border px-3 py-2" />
            <input required value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value })} placeholder="Código" className="rounded-lg border px-3 py-2" />
            <input required min="1" type="number" value={form.cargaHoraria} onChange={(e) => setForm({ ...form, cargaHoraria: Number(e.target.value) })} className="rounded-lg border px-3 py-2" />
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-white">{editing ? "Salvar" : "Cadastrar"}</button>
        </form>
        <Table headers={["Nome", "Código", "Carga horária", "Ações"]}>
            {crud.items.map((item) => <tr key={item.id} className="border-t"><td className="p-3">{item.nome}</td><td className="p-3">{item.codigo}</td><td className="p-3">{item.cargaHoraria} h</td><td className="p-3"><Actions onEdit={() => edit(item)} onDelete={() => void crud.excluir(item.id)} /></td></tr>)}
        </Table>
    </CrudLayout>;
}
