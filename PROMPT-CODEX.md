# Prompt operacional para o Codex

Leia integralmente `AGENTS.md` e `DOMAIN.md` antes de modificar qualquer arquivo.

Implemente o domínio descrito em `DOMAIN.md` sobre este template, preservando a arquitetura e a infraestrutura já validadas.

Requisitos obrigatórios:

- entregar uma solução de referência completa e funcional;
- backend e frontend devem permanecer aplicações locais separadas;
- gerar/ajustar modelos backend;
- gerar/ajustar DAOs com SQL puro;
- gerar/ajustar `backend/database/schema.sql`;
- gerar/ajustar `backend/database/seed.sql`;
- garantir CRUD completo de cada entidade persistente;
- implementar relacionamentos 1:N e N:N no backend e no frontend;
- gerar/ajustar modelos frontend;
- criar pelo menos uma página CRUD funcional para cada entidade persistente;
- atualizar a navegação para permitir acesso a todas as páginas;
- usar a infraestrutura existente para SQLite, Fastify, Fetch, CRUD e proxy `/api`;
- não introduzir ORM, Axios, Redux, Docker, autenticação ou novas camadas arquiteturais sem necessidade explícita;
- remover código do domínio anterior que não pertença ao novo domínio;
- não deixar TODOs, stubs, métodos vazios ou funcionalidades propositalmente incompletas.

Antes de concluir, valide:

```bash
cd backend
npm install
npm run build
npm run db:reset
```

```bash
cd frontend
npm install
npm run build
```

Depois valide a aplicação ponta a ponta com backend e frontend em execução, verificando criação, listagem, edição, exclusão e todos os relacionamentos definidos em `DOMAIN.md`.

Só considere a tarefa concluída quando o projeto estiver funcional como solução de referência completa.
