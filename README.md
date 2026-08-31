# Didactic Fullstack Template

Template didático full-stack para ensino de Programação Orientada a Objetos, SQL, APIs e componentes React com baixa curva de aprendizagem.

> Estado: **template de referência validado funcionalmente** para backend, frontend, SQLite, CRUD e relacionamentos 1:N e N:N.

## Objetivo

O template deve sempre representar uma **solução de referência completa e funcional**. A versão entregue aos alunos será preparada manualmente pelo professor, removendo apenas os arquivos ou trechos adequados à atividade.

O aluno não precisa conhecer os detalhes de infraestrutura para trabalhar com modelos, DAO, SQL e componentes React.

## Arquivos principais

- `AGENTS.md`: contrato arquitetural permanente do template.
- `DOMAIN.md`: descrição variável do domínio atual.
- `PROMPT-CODEX.md`: instrução operacional reutilizável para gerar ou substituir um domínio.
- `docs/AREAS.md`: classificação entre área didática, infraestrutura e implementação de referência.

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
- sem biblioteca de componentes obrigatória

## Arquitetura didática

Backend:

```text
Modelos -> DAO -> SQL -> SQLite
```

Frontend:

```text
Modelos -> páginas/componentes -> API encapsulada
```

A infraestrutura HTTP, conexão SQLite, Fetch, proxy e detalhes de integração permanecem prontos.

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

## Executar localmente

### Backend

```bash
cd backend
npm install
npm run build
npm run db:reset
npm run dev
```

API local: `http://127.0.0.1:3000`.

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run build
npm run dev
```

Frontend local: `http://127.0.0.1:5173`.

O Vite encaminha automaticamente chamadas iniciadas por `/api` para o backend. Assim, páginas e componentes não precisam conhecer host, porta ou configuração de CORS.

## Domínio de referência validado

A validação inicial utiliza:

- Universidade;
- Aluno;
- Disciplina.

Relacionamentos:

- Universidade 1:N Aluno;
- Aluno N:N Disciplina.

Foram validados criação do banco, seed, build TypeScript, carregamento dos dados, criação, leitura, atualização, exclusão e integração frontend/backend.

Veja `DOMAIN.md`.

## Como criar um novo projeto com outro domínio

### 1. Use este repositório como base

Crie uma cópia ou novo repositório baseado neste template.

### 2. Edite apenas o domínio

Substitua em `DOMAIN.md`:

- nome do projeto;
- descrição;
- diagrama de classes;
- entidades e atributos;
- relacionamentos;
- regras específicas;
- dados iniciais desejados.

Não é necessário reescrever a arquitetura.

### 3. Execute o prompt do Codex

Use o conteúdo de `PROMPT-CODEX.md` ou envie ao Codex uma instrução equivalente a:

```text
Leia integralmente AGENTS.md e DOMAIN.md e implemente o domínio completo sobre este template. Preserve a infraestrutura e só conclua quando backend, frontend, banco, CRUD e relacionamentos estiverem funcionais.
```

O agente deve usar `AGENTS.md` como contrato obrigatório.

### 4. Valide a solução de referência

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

Teste pela interface:

- listagem;
- criação;
- edição;
- exclusão;
- relacionamentos 1:N;
- relacionamentos N:N;
- mensagens de erro.

### 5. Prepare manualmente a versão do aluno

Somente depois da solução completa estar validada, o professor decide quais arquivos ou trechos serão removidos.

Exemplos possíveis:

- remover modelos backend;
- remover DAOs ou apenas os SQLs;
- manter backend completo e remover modelos/componentes frontend;
- manter um CRUD como exemplo e remover outros;
- retirar apenas a implementação de um relacionamento.

O template não automatiza essa etapa porque a escolha depende do objetivo pedagógico de cada atividade.

## Critério obrigatório para novos domínios

Um domínio só está concluído quando:

1. `schema.sql` e `seed.sql` recriam o SQLite local;
2. backend e frontend passam no build TypeScript;
3. todas as entidades persistentes possuem CRUD funcional;
4. cada entidade persistente possui uma página CRUD funcional;
5. relacionamentos 1:N e N:N definidos no domínio funcionam;
6. o frontend consome a API pela infraestrutura pronta;
7. criação, leitura, atualização e exclusão foram verificadas;
8. não existem TODOs, stubs ou implementações propositalmente incompletas.

## Regra fundamental

**O domínio muda; a arquitetura didática permanece.**

Antes de qualquer alteração estrutural, consulte `AGENTS.md`.
