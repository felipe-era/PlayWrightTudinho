📂 .github
│  └── workflows
│      └── playwright.yml    # GitHub Actions (CI)
📂 fixtures
│  ├── apiRetorno
│  │  ├── busca_produtos.json
│  │  ├── cria_usuario.json
│  │  ├── lista_produtos.json
│  │  ├── usuario_cadastrado.json
│  │  ├── valida_delete.json
│  │  ├── valida_put.json
│  │  └── valida_UpdateUserResponse.json
│  └── dados.json            # Dados gerais reutilizáveis
📂 tests
│  ├── api
│  │  └── apiTests.spec.js   # Testes de API
│  └── ui
│     ├── e2e.spec.js        # Testes de UI ponta a ponta
│     └── example.spec.js    # Exemplo padrão Playwright
📂 utils
│  └── config.ts             # Configurações e helpers
📂 playwright-report          # Relatórios HTML gerados automaticamente
📂 test-results               # Resultados dos testes (screenshots, vídeos, logs)
├── .gitignore
├── package.json
└── package-lock.json
