# Painel Ikesaki - Dashboard MongoDB

[Abrir demo estatica do painel](https://lariantunez.github.io/painel-ikesaki/)

Dashboard web desenvolvido para automatizar analises comerciais do cliente Ikesaki, transformando consultas antes feitas manualmente em planilhas dinamicas em um painel com importacao, tratamento e indicadores executivos.

O projeto contempla vendas, valor, estoque e rotinas especificas de contagem manual de estoque, com filtros e agregacoes preparadas para uso pela diretoria comercial.

## Objetivo

Reduzir trabalho manual em Excel e oferecer uma visao recorrente, padronizada e navegavel dos principais indicadores de sell out e estoque do cliente Ikesaki.

## Principais recursos

- Importacao de dados brutos em CSV/XLSX.
- Tratamento de datas, meses, GTIN/EAN e campos numericos.
- De/Para de lojas e categorias.
- Dashboard com KPIs de vendas, faturamento, estoque e evolucao diaria.
- Filtros por periodo, filial, categoria, familia e produto.
- Importacao de estoque manual com modelo de planilha.
- Template de contagem de estoque para download.
- Area administrativa com usuarios, admins, logs e templates.
- Reset de senha por e-mail.
- Healthcheck e modo somente leitura para deploy/demo.

## Tecnologias

- Node.js
- Express
- MongoDB Atlas
- HTML, CSS e JavaScript puro
- Multer
- XLSX
- csv-parser
- Nodemailer
- Docker

## Estrutura

```text
backend/src/server.js                API, importacoes, autenticacao e agregacoes
frontend/index.html                  Dashboard e administracao
frontend/reset-senha.html            Redefinicao de senha
modelo_contagem_estoque_ikesaki.xlsx Modelo vazio para rotina de estoque
docs/                                Manuais de uso e manutencao
README_DEPLOY.md                     Notas de deploy
Dockerfile                           Build da aplicacao
```

## Variaveis de ambiente

Use `.env.example` como referencia para criar o `.env` local. O `.env` nao deve ser publicado.

```env
PORT=3000
DB_NAME=ikesaki_dashboard
MONGODB_URI=mongodb+srv://USUARIO:SENHA@HOST/?appName=Cluster0
ADMIN_USER=usuario-admin
ADMIN_PASSWORD=senha-admin
ADMIN_EMAIL=email@dominio.com
EMAIL_USER=
EMAIL_PASS=
READ_ONLY=false
```

## Como executar

```bash
npm install
npm start
```

## Demo estatica

Este repositorio tambem possui uma demo do painel real em `docs/index.html`, criada para GitHub Pages e portfolio. Ela usa dados ficticios e uma API simulada no navegador, sem depender de MongoDB, backend ou variaveis de ambiente.

## Cuidados de portfolio

O repositorio deve permanecer sem bases reais, credenciais, uploads e planilhas operacionais. Apenas o modelo vazio de contagem de estoque e mantido para demonstrar a funcionalidade.

## Status

Projeto funcional, com rotinas de importacao, dashboard analitico, administracao e deploy via Docker.
