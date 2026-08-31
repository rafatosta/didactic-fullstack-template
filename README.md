# Didactic Fullstack Template

Template didático full-stack para ensino de Programação Orientada a Objetos, SQL, APIs, testes e componentes React com baixa curva de aprendizagem.

> Estado: **template de referência validado funcionalmente** para backend, frontend, SQLite, CRUD e relacionamentos 1:N e N:N. A suíte automatizada agora também faz parte do contrato de validação.

## Objetivo

O template representa sempre uma **solução de referência completa e funcional**. A versão entregue aos alunos é preparada manualmente pelo professor, removendo apenas os arquivos ou trechos adequados à atividade.

Os testes possuem duas funções:

1. segurança do template e do Codex, detectando regressões automaticamente;
2. apoio didático/TDD, permitindo que testes claros orientem o aluno sobre o comportamento esperado.

## Arquivos principais

- `AGENTS.md`: contrato arquitetural permanente, incluindo regras obrigatórias de testes.
- `DOMAIN.md`: descrição variável do domínio atual.
- `PROMPT-CODEX.md`: instrução operacional para gerar/substituir um domínio e validar build + testes.
- `docs/AREAS.md`: classificação entre área didática, infraestrutura e implementação de referência.

## Stack

### Backend
Node.js + TypeScript, Fastify 5, SQLite, `better-sqlite3`, DAO + SQL puro e Vitest.

### Frontend
Vite 8, React 19 + TypeScript, Tailwind CSS 4, Fetch encapsulado, Vitest + React Testing Library + jsdom.

## Arquitetura didática

```text
Backend:  Modelos -> DAO -> SQL -> SQLite
Frontend: Modelos -> páginas/componentes -> API encapsulada
Testes:   comportamento esperado -> implementação -> validação
```

## Testes

Estrutura:

```text
backend/tests/
├── didactic/          # comportamento do domínio; pode orientar atividades TDD
└── infrastructure/    # manutenção/regressões da infraestrutura

frontend/tests/
├── didactic/
└── infrastructure/
```

Os testes backend usam SQLite temporário/isolado e **não devem tocar em `backend/database/app.db`**.

### Backend

```bash
cd backend
npm install
npm run build
npm run test:run
npm run db:reset
npm run dev
```

Modo TDD/watch:

```bash
npm run test:watch
```

### Frontend

```bash
cd frontend
npm install
npm run build
npm run test:run
npm run dev
```

Modo TDD/watch:

```bash
npm run test:watch
```

## Domínio de referência

Universidade, Aluno e Disciplina, com Universidade 1:N Aluno e Aluno N:N Disciplina. Veja `DOMAIN.md`.

## Como gerar outro domínio

1. copie/use este template como base;
2. substitua o conteúdo variável de `DOMAIN.md`;
3. execute as instruções de `PROMPT-CODEX.md`;
4. o Codex deve gerar backend, frontend, schema, seed, CRUD, relacionamentos e testes;
5. builds e `npm run test:run` de backend e frontend devem passar;
6. valide a aplicação ponta a ponta;
7. somente depois prepare manualmente a versão do aluno.

## Critério obrigatório de conclusão

Um novo domínio só está concluído quando:

- `schema.sql` e `seed.sql` recriam o banco;
- builds backend/frontend passam;
- testes backend/frontend estão verdes;
- todas as entidades possuem CRUD funcional;
- cada entidade possui página CRUD;
- relações 1:N e N:N funcionam;
- frontend usa a infraestrutura de API pronta;
- não existem TODOs, stubs ou implementações incompletas.

## Regra fundamental

**O domínio muda; a arquitetura didática e os testes de validação permanecem.**
