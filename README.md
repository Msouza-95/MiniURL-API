# URL Shortener 

## Descrição 
<p> 
Este projeto é uma API RESTful desenvolvida com Node.js para encurtar URLs. O sistema permite que os usuários encurtem URLs longas para um máximo de 6 caracteres, possibilitando o gerenciamento dessas URLs por usuários autenticados.
</p>

## Funcionalidades

- Encurtamento de URLs: Qualquer usuário pode enviar uma URL e receber uma versão encurtada, com um máximo de 6 caracteres.

- Autenticação de Usuários: Usuários podem se cadastrar e autenticar no sistema.

- Gerenciamento de URLs:
Usuários autenticados podem listar, editar e excluir URLs encurtadas por eles.

- Ao listar as URLs, o sistema exibe a quantidade de cliques que cada URL recebeu.

- Contagem de Cliques: Cada acesso a uma URL encurtada é contabilizado.

- Controle de Exclusão Lógica: As URLs podem ser excluídas logicamente do banco de dados, mantendo um registro da data de exclusão.

- Registro de Atualizações: Todos os registros mantêm informações sobre quando foram atualizados pela última vez.

- Historico de click de um usuarios 

## Baixar depedencias

```bash
$ yarn install
```

## gerar banco de dados com docker

```bash
$ docker-compose up
```

## Gerar as migrations

```bash
# sicronizar 
$ migration:dev

# gerar a migration
$ migration:run
```

## Rodar a API

```bash
$ yarn run start:dev
```

## Test

```bash
# unit tests
$ yarn test 
```

## License

Nest is [MIT licensed](LICENSE).
