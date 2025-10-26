# Todo-app

Этот проект использует React с TypeScript, Vite для сборки и разработки, Docker для контейнеризации и Nginx для продакшн-раздачи SPA.

---

## Содержание

- [Установка](#установка)
- [Локальная разработка (dev)](#локальная-разработка-dev)
- [Продакшн (prod)](#продакшн-prod)
- [Остановка контейнеров](#остановка-контейнеров)
- [Переменные окружения](#переменные-окружения)
- [ESLint и TypeScript](#eslint-и-typescript)

---

## Установка

```bash
# Клонируем репозиторий
git clone https://github.com/DarkEy3S/todo-app.git
cd repo

# Устанавливаем зависимости
npm ci
````

---

## Локальная разработка (dev)

```bash
# Запуск через Docker (dev)
npm run docker:dev
```

* Откроется на `http://localhost:5173`
* Поддерживается HMR (Hot Module Replacement)
* Переменные окружения можно настроить через `.env.dev`

---

## Продакшн (prod)

```bash
# Запуск через Docker (prod)
npm run docker:prod
```

* Nginx раздаёт собранное SPA
* Доступно по `http://localhost` (порт можно изменить в `.env`)
* React Router работает корректно (без перезагрузки страницы при переходах)

---

## Остановка контейнеров

```bash
npm run docker:down
```

---

## Переменные окружения

Создайте `.env` или `.env.dev` / `.env.prod` файлы:

```text
# .env.dev
BUILD_TARGET=dev
PORT=5173
NODE_ENV=development

# .env.prod
BUILD_TARGET=prod
PORT=80
NODE_ENV=production
```

> ⚡ Совет: добавьте `.env.example` с примером значений для Git, а реальные `.env` не пушьте.

---

## ESLint и TypeScript

* Проверка кода с ESLint:

```bash
npm run lint
```

* Проверка TypeScript без генерации файлов:

```bash
tsc --noEmit
```

* Используются плагины для React:

    * `eslint-plugin-react-x`
    * `eslint-plugin-react-dom`

---

## Полезные ссылки

* [Vite](https://vitejs.dev/)
* [React Router](https://reactrouter.com/)
* [Docker](https://www.docker.com/)
* [Nginx](https://nginx.org/)
