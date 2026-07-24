# controle-gastos
sistema de controle de gastos residencias feito com C#, React e TypeScript

# Controle de Gastos Residenciais

## Tecnologias

- React
- TypeScript
- .NET
- C#
- SQLite

## Funcionalidades

- Cadastro de pessoas
- Cadastro de transações
- Consulta de totais

## Regras de negócio

- Pessoas menores de 18 anos podem cadastrar apenas despesas.
- Ao excluir uma pessoa, todas as suas transações também são excluídas.
- Os dados permanecem salvos após fechar a aplicação.

## Estrutura

Frontend
- React + TypeScript

Backend
- ASP.NET Core Web API

Banco
- SQLite


## Como executar

### Backend

```bash
dotnet restore
dotnet run
```

### Frontend

```bash
npm install
npm run dev
```
