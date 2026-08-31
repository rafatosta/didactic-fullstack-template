# Didactic Fullstack Template

Template didático full-stack para ensino de Programação Orientada a Objetos, SQL, APIs e componentes React com baixa curva de aprendizagem.

> Estado: primeira implementação de referência em validação. O arquivo `AGENTS.md` definitivo e o prompt de geração de novos domínios serão criados somente depois que esta base estiver estabilizada.

## Objetivo

O template deve sempre representar uma **solução de referência completa e funcional**. A versão entregue aos alunos será preparada manualmente pelo professor, removendo apenas os arquivos ou trechos adequados à atividade.

O aluno não precisa conhecer os detalhes de infraestrutura para trabalhar com modelos, DAO, SQL e componentes React.

## Stack

### Backend

- Node.js + TypeScript
- Fastify 5
- SQLite
- `better-sqlite3`
- padrão DAO
- SQL puro
- `schema.sql` para criação do banco
- `seed.sql` para dados iniciais
- sem ORM

### Frontend

- Vite 8
- React 19 + TypeScript
- Tailwind CSS 4
- Fetch encapsulado
- CRUD encapsulado por infraestrutura própria
- sem Axios
- sem Redux
- sem biblioteca de componentes nesta primeira versão

## Domínio de referência

A validação inicial usa três entidades:

- Universidade
- Aluno
- Disciplina

Relacionamentos:

- Universidade 1:N Aluno
- Aluno N:N Disciplina

Veja `DOMAIN.md`.

## Estrutura

```text
backend/
├── database/
│   ├── schema.sql
│   └── seed.sql
├── scripts/
│   └── reset-db.ts
└── src/
    ├── models/       # área didática
    ├── dao/          # área didática
    ├── framework/    # infraestrutura
    └── routes/       # infraestrutura

frontend/
└── src/
    ├── models/       # área didática
    ├── pages/        # área didática/referência
    └── framework/    # infraestrutura
```

A classificação completa está em `docs/AREAS.md`.

## Executar localmente

### Backend

```bash
cd backend
npm install
npm run db:reset
npm run dev
```

API local: `http://127.0.0.1:3000`.

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend local: `http://127.0.0.1:5173`.

O Vite encaminha automaticamente chamadas iniciadas por `/api` para o backend. Assim, páginas e componentes não precisam conhecer host, porta ou configuração de CORS.

## Validação manual da primeira versão

Backend:

```bash
cd backend
npm install
npm run build
npm run db:reset
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run build
npm run dev
```

Com os dois processos executando, validar pelo frontend:

```bash
curl http://127.0.0.1:5173/api/health
curl http://127.0.0.1:5173/api/universidades
curl http://127.0.0.1:5173/api/disciplinas
curl http://127.0.0.1:5173/api/alunos
```

## Critério mínimo de validade

O template só será considerado estabilizado quando:

1. `schema.sql` e `seed.sql` recriarem o SQLite local;
2. backend e frontend passarem na verificação TypeScript;
3. todas as entidades tiverem CRUD funcional;
4. relacionamentos 1:N e N:N funcionarem;
5. cada modelo persistente possuir uma página CRUD funcional;
6. o frontend consumir a API somente pela infraestrutura pronta;
7. criação, leitura, atualização e exclusão forem verificadas pela interface.

## Próxima etapa

Depois da estabilização desta base será criado o conjunto definitivo de regras (`AGENTS.md`) e a especificação que permitirá ao Codex transformar um novo diagrama de classes em outro projeto completo sem alterar a arquitetura do template.
