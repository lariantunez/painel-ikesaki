FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./backend/

RUN cd backend && npm install --omit=dev

COPY backend ./backend
COPY frontend ./frontend
COPY modelo_contagem_estoque_ikesaki.xlsx ./modelo_contagem_estoque_ikesaki.xlsx

ENV NODE_ENV=production
ENV PORT=8000
EXPOSE 8000

CMD ["node", "backend/src/server.js"]
