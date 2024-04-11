# Documentação do Frontend em Angular

Este é um guia para iniciar e acessar o frontend em angular, que está rodando em um ambiente Docker.
## Inicialização do Frontend

Certifique-se de ter o Docker instalado em seu sistema antes de prosseguir.

1. Abra o terminal.

2. Navegue até o diretório do projeto onde está localizado o frontend angular.

3. Execute o seguinte comando para iniciar a aplicação:

```bash
docker-compose up
```

Este comando instalará todas as dependências listadas no arquivo package.json no diretório do projeto.

Além de compilar o projeto e iniciar um servidor de desenvolvimento. Após a compilação bem-sucedida, a aplicação estará acessível em http://localhost:4200 no seu navegador.

Certifique-se de que nenhum erro ocorreu durante a compilação e que o servidor está sendo executado corretamente.

## Acessando o sistema

Por padrão, o backend em quarkus disponibiliza um usuário e senha padrão, como administrador, podendo ser acessados por:

- login: admin@officecom
- senha: admin
