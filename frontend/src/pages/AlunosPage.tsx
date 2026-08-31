/** ÁREA DIDÁTICA / REFERÊNCIA: página CRUD completa de Aluno e relacionamentos. */
import { useEffect, useState, type FormEvent } from "react";
import { alunosApi, disciplinasApi, universidadesApi } from "../framework/resources";
import { useCrud } from "../framework/useCrud";
import type { Aluno, NovoAluno } from "../models/Aluno";
import type { Disciplina } from "../models/Disciplina";
import type { Universidade } from "../models/Universidade";
import { Actions, CrudLayout, Table } from "./UniversidadesPage";

const empty: NovoAluno = { nome: "", matricula: "", email: "", universidadeId: 0, disciplinaIds: [] };

export function AlunosPage() {
    const crud = useCrud(alunosApi);
    const [universidades, setUniversidades] = useState<Universidade[]>([]);
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
    const [editing, setEditing] = useState<Aluno | null>(null);
    const [form, setForm] = useState<NovoAluno>(empty);

    useEffect(() => {
        void Promise.all([universidadesApi.listar(), disciplinasApi.listar()]).then(([u, d]) => {
            setUniversidades(u);
            setDisciplinas(d);
            setForm((current) => current.universidadeId ? current : { ...current, universidadeId: u[0]?.id ?? 0 });
        });
    }, []);

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        if (editing) await crud.atualizar(editing.id, form);
        else await crud.criar(form);
        setEditing(null);
        setForm({ ...empty, universidadeId: universidades[0]?.id ?? 0 });
    };

    const edit = (item: Aluno) => {
        setEditing(item);
        setForm({ nome: item.nome, matricula: item.matricula, email: item.email, universidadeId: item.universidadeId, disciplinaIds: item.disciplinaIds });
    };

    const toggleDisciplina = (id: number) => setForm((current) => ({
        ...current,
        disciplinaIds: current.disciplinaIds.includes(id)
            ? current.disciplinaIds.filter((value) => value !== id)
            : [...current.disciplinaIds, id],
    }));

    const universidadeNome = (id: number) => universidades.find((item) => item.id === id)?.nome ?? "—";

    return <CrudLayout title="Alunos" loading={crud.loading} error={crud.error}>
        <form onSubmit={submit} className="mb-6 space-y-4 rounded-xl bg-white p-4 shadow-sm">
            <div className="grid gap-3 md:grid-cols-2"><input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Nome" className="rounded-lg border px-3 py-2" /><input required value={form.matricula} onChange={(e) => setForm({ ...form, matricula: e.target.value })} placeholder="Matrícula" className="rounded-lg border px-3 py-2" /><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="E-mail" className="rounded-lg border px-3 py-2" /><select required value={form.universidadeId} onChange={(e) => setForm({ ...form, universidadeId: Number(e.target.value) })} className="rounded-lg border px-3 py-2"><option value={0} disabled>Selecione a universidade</option>{universidades.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}</select></div>
            <fieldset><legend className="mb-2 font-medium">Disciplinas</legend><div className="grid gap-2 md:grid-cols-3">{disciplinas.map((item) => <label key={item.id} className="flex gap-2 rounded-lg border p-2"><input type="checkbox" checked={form.disciplinaIds.includes(item.id)} onChange={() => toggleDisciplina(item.id)} />{item.nome}</label>)}</div></fieldset>
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-white">{editing ? "Salvar" : "Cadastrar"}</button>
        </form>
        <Table headers={["Nome", "Matrícula", "Universidade", "Disciplinas", "Ações"]}>
            {crud.items.map((item) => <tr key={item.id} className="border-t"><td className="p-3">{item.nome}<div className="text-xs text-slate-500">{item.email}</div></td><td className="p-3">{item.matricula}</td><td className="p-3">{universidadeNome(item.universidadeId)}</td><td className="p-3">{item.disciplinaIds.length}</td><td className="p-3"><Actions onEdit={() => edit(item)} onDelete={() => void crud.excluir(item.id)} /></td></tr>)}
        </Table>
    </CrudLayout>;
}
