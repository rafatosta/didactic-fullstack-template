# AGENTS.md

Este arquivo define as regras obrigatórias para qualquer agente que modifique este repositório.

## Objetivo do template

Este repositório é um template didático full-stack autossuficiente para ensino de Programação Orientada a Objetos, SQL, APIs, testes e componentes React com baixa curva de aprendizagem.

O fluxo esperado para um novo projeto é simples:

1. o usuário cria um fork deste template;
2. renomeia o repositório;
3. abre o novo repositório no Codex;
4. fornece uma descrição textual, diagrama de classes, imagem, PDF, arquivo anexado ou referência explícita a material que descreva o domínio;
5. o agente interpreta o material, gera `DOMAIN.md` automaticamente e implementa o projeto completo;
6. o agente executa build, testes e validações antes de concluir.

O resultado de qualquer geração deve ser uma **solução de referência completa e funcional**. A versão destinada aos alunos será preparada manualmente pelo professor depois da validação.

Nunca deixe TODOs, stubs, métodos vazios, páginas incompletas ou funcionalidades propositalmente quebradas para fins pedagógicos.

## Fonte da verdade

- `AGENTS.md`: arquitetura fixa e regras que não devem variar entre projetos.
- material fornecido pelo usuário na solicitação: fonte inicial para descoberta do novo domínio;
- `DOMAIN.md`: documentação gerada do domínio atual e fonte da verdade depois que o domínio for interpretado;
- implementação existente: referência concreta de como a arquitetura deve ser aplicada.

`DOMAIN.md` **não é pré-requisito manual para criar um novo projeto**. Em um fork novo, o agente deve substituí-lo automaticamente com base no material fornecido pelo usuário.

## Descoberta automática do domínio

Antes de alterar código de domínio, o agente deve:

1. ler integralmente este `AGENTS.md`;
2. analisar a solicitação atual do usuário;
3. verificar se há imagens anexadas, diagramas de classes, PDFs, documentos, arquivos ou referências explícitas a anexos que descrevam o sistema;
4. analisar todas as fontes disponíveis e consolidar entidades, atributos, tipos, cardinalidades e regras explícitas;
5. usar o nome do repositório e o texto do usuário apenas como contexto auxiliar, nunca como substituto de informações mais precisas presentes no diagrama ou arquivo;
6. não inventar regras de negócio que não estejam explícitas ou claramente determinadas pela estrutura do domínio;
7. gerar ou substituir `DOMAIN.md` antes de implementar o novo domínio.

Se houver conflito entre fontes, priorize, nesta ordem:

1. instrução explícita mais recente do usuário;
2. diagrama/arquivo fornecido especificamente para o novo projeto;
3. descrição textual do novo projeto;
4. conteúdo antigo de `DOMAIN.md`, que em um fork deve ser tratado apenas como domínio de referência a ser substituído.

O `DOMAIN.md` gerado deve registrar no mínimo:

- nome do projeto;
- descrição resumida;
- entidades persistentes;
- atributos e tipos;
- relacionamentos e cardinalidades;
- regras de domínio explicitamente conhecidas;
- tabelas associativas necessárias;
- dados iniciais suficientes para testar CRUD e relacionamentos.

## Substituição do domínio de referência

O template contém Universidade, Aluno e Disciplina apenas como implementação de referência validada.

Ao identificar um novo domínio, remova completamente do projeto tudo o que pertencer exclusivamente ao domínio anterior e que não faça parte do novo sistema, incluindo quando aplicável:

- modelos;
- DAOs;
- rotas/recursos específicos;
- páginas;
- itens de navegação;
- tabelas e seeds;
- testes didáticos;
- referências textuais específicas do domínio anterior.

Preserve a infraestrutura compartilhada.

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

Cada entidade persistente definida no `DOMAIN.md` gerado deve possuir modelo TypeScript e DAO próprio. O DAO deve encapsular persistência, usar SQL puro, implementar CRUD completo, reutilizar a infraestrutura de banco e evitar camadas adicionais desnecessárias.

Cada entidade deve expor endpoints para listar, buscar por id, criar, atualizar e excluir, quando aplicável. Rotas adicionais são permitidas apenas para relacionamentos ou comportamentos que o CRUD genérico não represente.

## Frontend

Cada entidade persistente definida no `DOMAIN.md` gerado deve possuir pelo menos uma página CRUD funcional. A navegação principal deve permitir acesso a todas as entidades.

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

## Processo de geração de um novo projeto

Depois de descobrir e documentar o domínio em `DOMAIN.md`:

1. remova código específico do domínio anterior;
2. atualize `schema.sql` e `seed.sql`;
3. gere modelos backend;
4. gere DAOs;
5. registre CRUD e rotas necessárias;
6. gere modelos frontend;
7. gere páginas CRUD;
8. implemente os relacionamentos na interface;
9. atualize menu/navegação;
10. gere ou adapte testes didáticos;
11. preserve e ajuste testes de infraestrutura somente quando necessário;
12. execute todas as validações obrigatórias;
13. corrija automaticamente qualquer falha encontrada antes de concluir.

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

Validar ainda: `/api/health`; carregamento de todas as entidades; CREATE/READ/UPDATE/DELETE; relações definidas no domínio; mensagens de erro; ausência de erros TypeScript; ausência de TODOs/stubs; todos os testes verdes.

Não considere concluído apenas porque o código compila. Corrija as falhas encontradas durante build, testes ou validação funcional.

## Resultado esperado

Backend: `models -> dao -> SQL -> SQLite`.
Frontend: `models -> pages/components -> API encapsulada`.
Testes: especificação executável do comportamento esperado.

O domínio muda. A arquitetura didática permanece.
