# Базовый образ Node
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# ---------- Development stage ----------
FROM base AS dev
EXPOSE 5173
CMD ["npm", "run", "dev"]

# ---------- Production build ----------
FROM base AS build
RUN npm run build

# ---------- Production run (nginx) ----------
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
