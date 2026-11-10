# REGISTRO DE SERVIÇOS CFTV

PWA para gerenciamento de serviços de CFTV (fechamento de circuito de televisão), distribuída via GitHub Pages com backend serverless 100% Google Cloud.

## Valores aprovados (não alterar sem consenso)

| Item | Valor |
|---|---|
| Nome do app | REGISTRO DE SERVIÇOS CFTV |
| UUID da marca | `2dfce9de-de4b-57ae-a291-a170c20195cd` |
| Repositório | `registros-de-servicos-cfvt` |
| Sugestão URL GitHub Pages (não publicada) | `https://bigfatalbear.github.io/registros-de-servicos-cfvt/` |
| ID Google Cloud sugerido (não provisionado) | `registro-de-servicos-cf-2fe814` |
| Pasta appDataFolder Google Drive | `dados do app serviços cftv` |
| Domínio | GitHub Pages (basta) |
| Pagamentos | Link de pagamento suficiente |

## Estrutura

```
registro-servicos-cftv/
├── frontend/                 # PWA estática -> GitHub Pages
│   ├── index.html
│   ├── manifest.json
│   ├── service-worker.js
│   ├── css/style.css
│   └── js/app.js
├── backend/
│   └── functions/            # Cloud Functions 2nd gen (Node.js)
│       ├── package.json
│       └── index.js
├── firebase.json
├── firestore.rules
├── storage.rules
└── .gitignore
```

## Arquitetura

- **Frontend:** PWA estática (HTML/JS/CSS) hospedada no GitHub Pages. Nunca contém segredos, chaves de API ou credenciais.
- **Backend:** Cloud Functions (2ª geração) em Node.js, expondo endpoints HTTP para autenticação, ORçamentos, OS, fotos, assinaturas, pagamentos e estoque.
- **Banco:** Firestore (NoSQL) com regras de segurança declarativas.
- **Arquivos:** Cloud Storage para fotos, anexos, assinaturas e PDFs gerados.
- **Auth:** Firebase Auth (e-mail/senha e/ou Google).
- **Google Drive:** appDataFolder privado (`dados do app serviços cftv`) para backup/exportação de dados do app.

## Segurança

- Nenhum segredo no frontend, repositório ou instalador.
- Tokens e chaves configurados via Secret Manager / variáveis de ambiente das Cloud Functions.
- Validação de entrada e autorização feitas exclusivamente no servidor.
- Regras de Firestore e Storage restringem acesso por usuário autenticado.

## Como iniciar

1. Substitua `<SEU_USUARIO>` nos arquivos de configuração pelo seu usuário do GitHub.
2. Crie o repositório `registros-de-servicos-cfvt` no GitHub.
3. Configure o Firebase/Google Cloud com o projeto `registro-de-servicos-cf-2fe814` (confirme disponibilidade antes de provisionar).
4. Habilite as APIs: Firestore, Cloud Storage, Cloud Functions, Firebase Auth.
5. Faça deploy do frontend no GitHub Pages e das funções no Cloud Functions.
