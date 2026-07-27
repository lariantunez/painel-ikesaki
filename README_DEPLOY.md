# Deploy - Painel Ikesaki

## Variaveis de ambiente

Configure estas variaveis no Koyeb:

```env
READ_ONLY=false
PORT=3000
DB_NAME=ikesaki_dashboard
MONGODB_URI=mongodb+srv://USUARIO:SENHA@HOST/?appName=Cluster0
ADMIN_USER=larissa antunez
ADMIN_PASSWORD=SENHA_DO_ADMIN
ADMIN_EMAIL=analytics@chercom.com.br
```

`EMAIL_USER` e `EMAIL_PASS` sao opcionais e usados apenas para envio de e-mail de redefinicao de senha.

## Build

O projeto esta preparado para deploy por Dockerfile.

```bash
docker build -t ikesaki-dashboard .
docker run --env-file .env -p 3000:3000 ikesaki-dashboard
```

## Observacoes

- As bases brutas e modelos `.xlsx`/`.csv` nao entram no Git nem no Docker.
- Os dados do painel ficam no MongoDB, banco `ikesaki_dashboard`.
- O arquivo `.env` local contem credenciais e nao deve ser commitado.
