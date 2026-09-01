# Didactic Fullstack Template

Template didático full-stack para ensino de Programação Orientada a Objetos, SQL, APIs, testes e componentes React com baixa curva de aprendizagem.

> Estado: **template de referência validado funcionalmente** para backend, frontend, SQLite, CRUD, relacionamentos 1:N e N:N e testes automatizados.

## Objetivo

Este repositório deve ser suficiente, sozinho, para gerar um novo projeto completo com Codex.

Não é necessário preencher `DOMAIN.md` manualmente nem utilizar outro repositório de workflow.

O template representa sempre uma **solução de referência completa e funcional**. A versão entregue aos alunos é preparada manualmente pelo professor depois da validação.

## Fluxo para criar um novo projeto

### 1. Faça um fork deste repositório

Crie um fork de:

```text
rafatosta/didactic-fullstack-template
```

### 2. Renomeie o fork

Use o nome do novo sistema.

Exemplo:

```text
sistema-pedido
```

### 3. Abra o novo repositório no Codex

O Codex deve trabalhar no fork, não no template original.

### 4. Forneça o domínio

Na mesma solicitação ao Codex, forneça pelo menos uma fonte que descreva o sistema:

- descrição textual;
- diagrama de classes em imagem;
- PDF;
- documento/arquivo anexado;
- outro arquivo contendo entidades e relacionamentos;
- referência explícita a um anexo presente na conversa.

Exemplo simples:

```text
Crie o projeto com base no diagrama de classes anexado.
```

Ou:

```text
Crie um Sistema de Pedidos com Item, Pedido e Venda conforme a descrição abaixo.
```

### 5. Execute o prompt único

Use `PROMPT-CODEX.md`.

Esse prompt instrui o Codex a fazer automaticamente todo o restante.

## O que o Codex deve fazer automaticamente

```text
material fornecido pelo usuário
        ↓
identificar entidades e relacionamentos
        ↓
gerar/substituir DOMAIN.md
        ↓
remover domínio de referência anterior
        ↓
gerar schema.sql + seed.sql
        ↓
gerar modelos + DAOs + API
        ↓
gerar frontend + páginas CRUD
        ↓
gerar relacionamentos na interface
        ↓
gerar/adaptar testes
        ↓
executar build + testes + db:reset
        ↓
corrigir falhas encontradas
        ↓
validar aplicação
        ↓
projeto de referência pronto
```

`DOMAIN.md` é gerado pelo Codex e passa a documentar o domínio identificado. Ele não precisa ser preparado manualmente antes da geração.

## Arquivos principais

- `AGENTS.md`: contrato arquitetural permanente e processo obrigatório de descoberta/geração do domínio.
- `PROMPT-CODEX.md`: prompt único para criar um projeto novo.
- `DOMAIN.md`: domínio atual; em novos projetos é gerado/substituído automaticamente.
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

## Domínio de referência

O template original contém Universidade, Aluno e Disciplina apenas para provar que toda a arquitetura funciona.

Em um novo fork, essas entidades devem ser removidas automaticamente quando não fizerem parte do novo domínio.

## Testes

Os testes possuem duas funções:

1. segurança do template e do Codex, detectando regressões;
2. apoio didático/TDD para os alunos.

Estrutura:

```text
backend/tests/
├── didactic/
└── infrastructure/

frontend/tests/
├── didactic/
└── infrastructure/
```

Os testes backend usam SQLite temporário/isolado e nunca devem alterar `backend/database/app.db`.

## Validação obrigatória

Backend:

```bash
cd backend
npm install
npm run build
npm run test:run
npm run db:reset
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run build
npm run test:run
npm run dev
```

Um novo projeto só está concluído quando:

- `DOMAIN.md` representa corretamente o novo domínio;
- código específico do domínio anterior foi removido;
- banco é recriado corretamente;
- builds backend/frontend passam;
- testes backend/frontend estão verdes;
- CRUD funciona;
- relacionamentos funcionam;
- interface utiliza controles legíveis para relacionamentos;
- não existem TODOs, stubs ou funcionalidades incompletas.

## Resumo

Para criar um projeto novo, o professor precisa fazer apenas:

```text
1. Fork
2. Renomear
3. Abrir no Codex
4. Anexar/descrever o domínio
5. Executar PROMPT-CODEX.md
```

Todo o restante deve ser automatizado pelo Codex.

## Regra fundamental

**O domínio muda; a arquitetura didática e os testes de validação permanecem.**
