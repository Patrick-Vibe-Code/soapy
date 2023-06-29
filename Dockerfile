# Stage 1: build React client
FROM node:18-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: run Express server
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY server/ ./server/
COPY --from=client-build /app/client/build ./client/build

EXPOSE 8080
CMD ["node", "server/server.js"]
