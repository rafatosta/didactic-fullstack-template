# AGENTS.md

Este arquivo define as regras obrigatórias para qualquer agente que modifique este repositório.

## Objetivo do template

Este repositório é um template didático full-stack para ensino de Programação Orientada a Objetos, SQL, APIs, testes e componentes React com baixa curva de aprendizagem.

O resultado de qualquer geração deve ser uma **solução de referência completa e funcional**. A versão destinada aos alunos será preparada manualmente pelo professor depois da validação.

Nunca deixe TODOs, stubs, métodos vazios, páginas incompletas ou funcionalidades propositalmente quebradas para fins pedagógicos.

## Fonte da verdade

- `AGENTS.md`: arquitetura fixa e regras que não devem variar entre projetos.
- `DOMAIN.md`: domínio variável do projeto atual.
- Implementação existente: referência concreta de como as regras abaixo devem ser aplicadas.

Em caso de conflito, preserve primeiro a arquitetura validada existente e depois ajuste a implementação do novo domínio.

## Stack obrigatória

### Backend
- Node.js
- TypeScript
- Fastify 5
- SQLite
- `better-sqlite3`
- padrão DAO
- SQL puro
- Vitest
- `schema.sql` para criação do banco
- `seed.sql` para povoamento
- sem ORM
- sem migrations nesta etapa

### Frontend
- Vite 8
- React 19
- TypeScript
- Tailwind CSS 4
- Fetch nativo encapsulado pela infraestrutura
- estado local do React
- Vitest + React Testing Library + jsdom
- sem Axios
- sem Redux
- sem biblioteca de componentes obrigatória

## Princípio arquitetural central

A infraestrutura pode ser moderna, mas a superfície que o aluno precisa compreender deve permanecer pequena.

Backend didático: modelos/interfaces/classes, DAOs, SQL do CRUD e relacionamentos. Frontend didático: modelos/interfaces correspondentes ao backend e componentes/páginas quando fizerem parte da atividade.

O aluno não deve precisar escrever conexão SQLite, configuração Fastify, detalhes HTTP, headers, URLs de API, CORS, proxy, serialização JSON ou Fetch para concluir uma atividade normal.

## Áreas do projeto

### ÁREA DIDÁTICA
Backend: `backend/src/models/`, `backend/src/dao/`, `backend/database/schema.sql`, `backend/tests/didactic/`.
Frontend: `frontend/src/models/`, `frontend/src/pages/`, componentes específicos do domínio e `frontend/tests/didactic/`.

### INFRAESTRUTURA
Backend: `backend/src/framework/`, `backend/src/routes/`, `backend/scripts/`, `backend/tests/infrastructure/` quando existirem.
Frontend: `frontend/src/framework/`, configuração Vite/Tailwind e `frontend/tests/infrastructure/`.

Não altere a infraestrutura existente apenas por preferência arquitetural. Altere somente quando houver necessidade funcional concreta e preserve compatibilidade com o padrão já validado.

### IMPLEMENTAÇÃO DE REFERÊNCIA
Código completo gerado para comprovar que o projeto funciona ponta a ponta. A remoção de conteúdo para criar a versão do aluno é responsabilidade posterior do professor.

## Banco de dados

O banco é SQLite e deve permanecer local. `schema.sql` cria estrutura e `seed.sql` fornece dados iniciais. O banco deve ser recriável integralmente por esses dois arquivos. Não use ORM nem migrations.

Testes nunca devem usar ou apagar `backend/database/app.db`. Use banco SQLite temporário/isolado por meio de `DIDACTIC_DATABASE_PATH` ou estratégia equivalente.

## Backend

Cada entidade persistente definida em `DOMAIN.md` deve possuir modelo TypeScript e DAO próprio. O DAO deve encapsular persistência, usar SQL puro, implementar CRUD completo, reutilizar a infraestrutura de banco e evitar camadas adicionais desnecessárias.

Cada entidade deve expor endpoints para listar, buscar por id, criar, atualizar e excluir, quando aplicável. Rotas adicionais são permitidas apenas para relacionamentos ou comportamentos que o CRUD genérico não represente.

## Frontend

Cada entidade persistente definida em `DOMAIN.md` deve possuir pelo menos uma página CRUD funcional. A navegação principal deve permitir acesso a todas as entidades.

O frontend possui modelos próprios correspondentes aos contratos da API. A duplicação entre backend e frontend é intencional e didática.

Nunca use `fetch` diretamente em páginas/componentes se a infraestrutura existente já oferecer a operação. Use caminhos relativos `/api/...` e o proxy Vite.

## Relacionamentos

Relacionamentos 1:N devem ser apresentados no formulário por controles legíveis, não por ids crus. Relacionamentos N:N devem possuir tabela associativa, chaves estrangeiras, persistência backend e controle simples no frontend.

## Testes automatizados obrigatórios

Todo domínio gerado deve possuir testes automatizados em backend e frontend.

### Backend
Use Vitest. Cobrir no mínimo:
- CRUD dos DAOs de cada entidade persistente;
- mapeamento e persistência de relacionamentos 1:N e N:N;
- comportamento das rotas/infraestrutura relevante;
- regressões conhecidas;
- banco de teste isolado.

### Frontend
Use Vitest + React Testing Library + jsdom. Cobrir no mínimo:
- renderização das páginas CRUD;
- listagem dos registros;
- criação;
- edição quando aplicável;
- exclusão;
- controles de relacionamento;
- cliente HTTP/CRUD encapsulado e regressões relevantes.

Prefira testar comportamento observável, não detalhes internos de implementação. Os testes didáticos devem ter nomes claros para poderem orientar alunos em atividades TDD.

Estrutura recomendada:

```text
backend/tests/
├── didactic/
└── infrastructure/

frontend/tests/
├── didactic/
└── infrastructure/
```

## Regras de simplicidade

Não introduza sem solicitação explícita: ORM, Prisma, TypeORM, Sequelize, Clean/Hexagonal, microserviços, Docker como requisito, autenticação, JWT, Redux, TanStack Query, Axios, Repository + Service + DAO simultaneamente ou abstrações sem necessidade.

## Alteração de domínio

Ao receber um novo `DOMAIN.md`: analise entidades/relacionamentos; atualize schema e seed; gere modelos e DAOs; registre CRUD/rotas; gere modelos e páginas frontend; implemente relacionamentos; atualize navegação; gere/atualize testes didáticos e de infraestrutura necessários; remova código do domínio anterior; preserve infraestrutura compartilhada.

## Critério obrigatório de conclusão

O trabalho só está concluído quando build, testes e aplicação de referência estiverem funcionais.

### Backend
```bash
cd backend
npm install
npm run build
npm run test:run
npm run db:reset
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run build
npm run test:run
npm run dev
```

Validar ainda: `/api/health`; carregamento de todas as entidades; CREATE/READ/UPDATE/DELETE; relações 1:N e N:N; mensagens de erro; ausência de erros TypeScript; ausência de TODOs/stubs; todos os testes verdes.

## Resultado esperado

Backend: `models -> dao -> SQL -> SQLite`.
Frontend: `models -> pages/components -> API encapsulada`.
Testes: especificação executável do comportamento esperado.

O domínio muda. A arquitetura didática permanece.
