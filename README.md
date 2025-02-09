# Мини-библиотека с использованием GraphQL и React

## Содержание репозитория

Backend:
`.NET C#`: [Hot Chocolate](https://chillicream.com/docs/hotchocolate/v13).

Frontend:
`React`: [Apollo Client](https://www.apollographql.com/docs/react/).

## Запуск

> [!NOTE]
> Во время разработки, я использовал `bun` вместо `node` или `deno`. Исходя из моих тестов, `bun` работает быстрее, чем `node`; и особенно это заметно при установке зависимостей.

Первоначальная настройка:

```bash
git clone https://github.com/Zensonaton/fan-library
cd fan-library

cd MyGraphQLAPI
dotnet restore

cd ../frontend
npm install
cd ..
```

Запуск:

```bash
cd MyGraphQLAPI
dotnet run

cd ../frontend
npm run dev
```

Адреса:

- [Frontend](http://localhost:5173/).
- [Backend (Nitro)](http://localhost:5178/graphql).

> [!TIP]
> Благодаря `.vscode/launch.json`, можно запустить backend и frontend одновременно, выбрав задачу "Launch backend and frontend", и запустив эту конфигурацию.
