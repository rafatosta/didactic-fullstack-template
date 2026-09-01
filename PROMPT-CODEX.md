# Prompt único para gerar um novo projeto

Crie o projeto completo a partir deste template e do material fornecido nesta solicitação.

Antes de modificar qualquer código:

1. leia integralmente `AGENTS.md`;
2. analise o texto desta solicitação;
3. verifique se existem imagens, diagramas de classes, PDFs, documentos, arquivos anexados ou referências explícitas a anexos que descrevam o domínio;
4. consolide as informações encontradas;
5. gere ou substitua automaticamente `DOMAIN.md` com o novo domínio;
6. não invente regras de negócio que não estejam explícitas ou claramente determinadas pelo material fornecido.

Depois implemente integralmente o novo domínio sobre a arquitetura existente.

Remova do projeto todo código que pertença exclusivamente ao domínio de referência anterior e que não faça parte do novo sistema, preservando a infraestrutura compartilhada.

Gere ou ajuste automaticamente tudo o que for necessário:

- modelos backend;
- DAOs com SQL puro;
- `backend/database/schema.sql`;
- `backend/database/seed.sql`;
- CRUD e rotas da API;
- relacionamentos definidos no domínio;
- modelos frontend;
- páginas CRUD;
- menu/navegação;
- controles legíveis para relacionamentos;
- testes didáticos;
- testes de infraestrutura necessários.

Preserve integralmente as regras arquiteturais de `AGENTS.md`.

Não introduza ORM, Prisma, TypeORM, Sequelize, Axios, Redux, Docker, autenticação ou camadas arquiteturais adicionais sem necessidade explícita.

Não deixe TODOs, stubs, métodos vazios ou funcionalidades incompletas.

Antes de concluir, execute e corrija todas as falhas encontradas:

```bash
cd backend
npm install
npm run build
npm run test:run
npm run db:reset
```

```bash
cd frontend
npm install
npm run build
npm run test:run
```

Valide também a aplicação integrada com backend e frontend em execução.

Só considere a tarefa concluída quando:

- `DOMAIN.md` representar corretamente o novo domínio;
- o domínio anterior tiver sido removido quando não aplicável;
- banco for recriado corretamente;
- backend e frontend compilarem;
- todos os testes estiverem verdes;
- CRUD funcionar;
- relacionamentos funcionarem;
- a aplicação estiver funcional como solução de referência completa.

Ao final, apresente um resumo curto com domínio identificado, entidades, relacionamentos, principais alterações e resultados de build/testes.
