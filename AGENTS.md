# AGENTS.md

Este arquivo define as regras obrigatórias para qualquer agente que modifique este repositório.

## Objetivo do template

Este repositório é um template didático full-stack para ensino de Programação Orientada a Objetos, SQL, APIs e componentes React com baixa curva de aprendizagem.

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
- sem Axios
- sem Redux
- sem biblioteca de componentes obrigatória

## Princípio arquitetural central

A infraestrutura pode ser moderna, mas a superfície que o aluno precisa compreender deve permanecer pequena.

O aluno deve trabalhar principalmente com:

Backend:
- modelos/interfaces/classes;
- DAOs;
- SQL do CRUD;
- relacionamentos de dados.

Frontend:
- modelos/interfaces correspondentes ao backend;
- componentes e páginas quando isso fizer parte da atividade.

O aluno não deve precisar escrever código de conexão SQLite, configuração Fastify, detalhes HTTP, headers, URLs de API, CORS, proxy, serialização JSON ou Fetch para concluir uma atividade normal.

## Áreas do projeto

### ÁREA DIDÁTICA

Conteúdo diretamente relacionado ao que pode ser estudado, removido ou parcialmente implementado na versão do aluno.

Backend:
- `backend/src/models/`
- `backend/src/dao/`
- `backend/database/schema.sql`

Frontend:
- `frontend/src/models/`
- `frontend/src/pages/`
- componentes específicos do domínio, quando existirem

### INFRAESTRUTURA

Código de suporte que deve permanecer pronto em atividades normais.

Backend:
- `backend/src/framework/`
- `backend/src/routes/`
- `backend/scripts/`

Frontend:
- `frontend/src/framework/`
- configuração Vite
- configuração Tailwind

Não altere a infraestrutura existente apenas por preferência arquitetural. Altere somente quando houver necessidade funcional concreta e preserve compatibilidade com o padrão já validado.

### IMPLEMENTAÇÃO DE REFERÊNCIA

Código completo gerado para comprovar que o projeto funciona ponta a ponta.

A implementação de referência deve sempre estar completa. A remoção de conteúdo para criar a versão do aluno é responsabilidade posterior do professor.

## Banco de dados

O banco é SQLite e deve permanecer local.

Arquivos obrigatórios:

- `backend/database/schema.sql`
- `backend/database/seed.sql`
- `backend/database/app.db` gerado localmente e não usado como fonte de verdade

Regras:

1. `schema.sql` deve criar todas as tabelas, chaves primárias, chaves estrangeiras, restrições e tabelas associativas necessárias ao domínio.
2. `seed.sql` deve inserir dados suficientes para que todas as páginas CRUD e relacionamentos possam ser testados após `npm run db:reset`.
3. O banco deve ser recriável integralmente a partir de `schema.sql` + `seed.sql`.
4. Não introduza ORM apenas para criar o banco.
5. Não introduza migrations enquanto o template permanecer com a finalidade didática atual.

## Backend

### Modelos

Cada entidade persistente definida em `DOMAIN.md` deve possuir um modelo TypeScript correspondente.

Mantenha os modelos simples e coerentes com os campos expostos pela API.

### DAO

Cada entidade persistente deve possuir um DAO próprio.

O DAO deve:

- encapsular persistência da entidade;
- utilizar SQL puro;
- implementar CRUD completo quando aplicável;
- utilizar a infraestrutura de banco existente;
- não acessar `better-sqlite3` diretamente fora da infraestrutura;
- evitar camadas adicionais como Service + Repository + DAO simultaneamente.

O objetivo didático é manter visível a relação:

`Modelo -> DAO -> SQL -> SQLite`.

### API

Cada entidade persistente deve possuir endpoints funcionais para:

- listar;
- buscar por id;
- criar;
- atualizar;
- excluir.

Use a infraestrutura de rotas existente quando ela atender ao caso.

Crie rotas adicionais apenas para operações de relacionamento ou comportamento que não possam ser representadas pelo CRUD genérico.

## Frontend

Cada entidade persistente definida em `DOMAIN.md` deve possuir pelo menos uma página funcional de CRUD.

Cada página deve permitir, quando aplicável:

- listar registros;
- criar registro;
- editar registro;
- excluir registro.

A navegação principal deve permitir acessar todas as entidades persistentes.

### Modelos do frontend

O frontend deve possuir modelos/interfaces próprios correspondentes aos contratos retornados pela API.

A duplicação entre modelo backend e frontend é intencional e didática.

### Comunicação com API

Nunca use `fetch` diretamente em páginas ou componentes de domínio se a infraestrutura existente já oferece a operação necessária.

Use `frontend/src/framework/api.ts` e os hooks/abstrações existentes.

O frontend deve chamar caminhos relativos `/api/...`. O proxy do Vite encaminha essas chamadas ao backend.

Não introduza CORS se o proxy local existente resolver a comunicação.

## Relacionamentos

### 1:N

Quando uma entidade pertence a outra, o formulário deve apresentar uma seleção legível da entidade relacionada.

Exemplo correto:

`Universidade: [ Universidade Federal ▼ ]`

Evite expor ao usuário um campo cru como `universidadeId` quando a relação puder ser representada por uma seleção.

### N:N

Relacionamentos N:N devem possuir:

- tabela associativa no SQLite;
- chaves estrangeiras adequadas;
- operações backend necessárias para consultar e atualizar associações;
- controle simples no frontend para associar/desassociar entidades.

A interface pode utilizar checkbox, multiselect ou outro controle simples e didático.

## Exclusão e integridade referencial

Respeite as regras de chave estrangeira do domínio.

Não silencie erros de integridade.

Quando uma exclusão não puder ocorrer por existir relacionamento dependente, a API deve retornar erro compreensível e o frontend deve apresentá-lo de forma legível.

## Regras de simplicidade

Não introduza sem solicitação explícita:

- ORM;
- Prisma;
- TypeORM;
- Sequelize;
- arquitetura Clean;
- arquitetura Hexagonal;
- microserviços;
- Docker como requisito;
- autenticação;
- JWT;
- Redux;
- TanStack Query;
- Axios;
- Repository + Service + DAO simultaneamente;
- DTOs duplicados sem necessidade;
- abstrações criadas apenas por preferência estética.

## Alteração de domínio

Ao receber um novo `DOMAIN.md`:

1. analise todas as entidades, atributos e relacionamentos;
2. identifique tabelas normais e tabelas associativas;
3. atualize `schema.sql`;
4. atualize `seed.sql`;
5. gere/ajuste modelos backend;
6. gere/ajuste DAOs;
7. registre CRUD e rotas de relacionamento;
8. gere/ajuste modelos frontend;
9. gere uma página CRUD para cada entidade persistente;
10. implemente controles para relacionamentos;
11. atualize menu/navegação;
12. remova código do domínio anterior que não pertença ao novo domínio;
13. preserve a infraestrutura compartilhada sempre que possível.

## Critério obrigatório de conclusão

O trabalho só está concluído quando a aplicação de referência estiver funcional ponta a ponta.

Validar, no mínimo:

### Backend

```bash
cd backend
npm install
npm run build
npm run db:reset
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run build
npm run dev
```

Com os dois executando, verificar:

- `/api/health` responde;
- todas as entidades carregam no frontend;
- CREATE funciona;
- READ/listagem funciona;
- UPDATE funciona;
- DELETE funciona quando permitido pelo domínio;
- relacionamentos 1:N funcionam;
- relacionamentos N:N funcionam;
- erros de API são apresentados de forma compreensível;
- não existem erros TypeScript no build;
- não existem TODOs ou stubs funcionais.

## Resultado esperado

Um novo projeto gerado a partir deste template deve manter a mesma experiência estrutural independentemente do domínio:

Backend:

`models -> dao -> SQL -> SQLite`

Frontend:

`models -> pages/components -> API encapsulada`

O domínio muda. A arquitetura didática permanece.
