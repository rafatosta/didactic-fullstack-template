/** IMPLEMENTAÇÃO DE REFERÊNCIA: navegação simples, sem biblioteca adicional. */
import { useState } from "react";
import { AlunosPage } from "./pages/AlunosPage";
import { DisciplinasPage } from "./pages/DisciplinasPage";
import { UniversidadesPage } from "./pages/UniversidadesPage";

type Page = "alunos" | "disciplinas" | "universidades";

const labels: Record<Page, string> = {
    alunos: "Alunos",
    disciplinas: "Disciplinas",
    universidades: "Universidades",
};

export default function App() {
    const [page, setPage] = useState<Page>("alunos");
    return <div className="min-h-screen md:flex">
        <aside className="bg-slate-950 p-5 text-white md:min-h-screen md:w-64">
            <div className="mb-6 text-xl font-bold">Projeto Didático</div>
            <nav className="flex gap-2 md:flex-col">{(Object.keys(labels) as Page[]).map((item) => <button key={item} onClick={() => setPage(item)} className={`rounded-lg px-3 py-2 text-left ${page === item ? "bg-white text-slate-950" : "hover:bg-slate-800"}`}>{labels[item]}</button>)}</nav>
        </aside>
        <main className="min-w-0 flex-1 p-5 md:p-8">{page === "alunos" && <AlunosPage />}{page === "disciplinas" && <DisciplinasPage />}{page === "universidades" && <UniversidadesPage />}</main>
    </div>;
}
