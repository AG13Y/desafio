# Desafio

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 20.1.3.

## Sobre

Aplicação de dicionário com cadastro, edição, exclusão e visualização de palavras, utilizando Angular e API mock via json-server.

## Como rodar o projeto

### 1. Instale as dependências

```bash
npm install
```

### 2. Inicie o servidor de desenvolvimento Angular

```bash
ng serve
```

Acesse [http://localhost:4200](http://localhost:4200) no navegador.

### 3. Inicie o servidor da API mock (json-server)

```bash
json-server --watch db/dados.json
```

A API estará disponível em [http://localhost:3000](http://localhost:3000).

## Testes unitários

Para executar os testes unitários com Karma, use:

```bash
ng test
```

## Estrutura do projeto

- `src/app/pages/` - Páginas principais da aplicação
- `src/app/shared/` - Serviços e interfaces compartilhados
- `db/dados.json` - Banco de dados mock para o json-server

## Gerar novos componentes

```bash
ng generate component nome-do-componente
```

## Build para produção

```bash
ng build
```

Os arquivos finais estarão em `dist/`.

## Recursos adicionais

- [Documentação Angular CLI](https://angular.dev/tools/cli)
- [Documentação json-server](https://github.com/typicode/json-server)

---

**Dica:**  
Sempre inicie o `ng serve` e o `json-server` juntos para garantir que a aplicação e a API estejam disponíveis.