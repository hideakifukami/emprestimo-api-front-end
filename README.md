# CodeBank - FrontEnd

Este é o projeto frontend do CodeBank, criado utilizando Angular e Bootstrap. A aplicação se comunica com uma API de gerenciamento de clientes através de requisições HTTP. Além disso, a biblioteca SweetAlert2 foi utilizada para exibir alertas personalizados.

## Como executar a aplicação?

Para executar a aplicação, siga os passos abaixo:

1. Certifique-se de que o Node.js e o Angular CLI estão instalados em sua máquina.
2. Faça o clone deste repositório.
3. Abra o terminal na pasta raiz do projeto.
4. Execute o comando npm install para instalar as dependências do projeto.
5. Execute o comando ng serve para iniciar a aplicação.
6. Acesse http://localhost:4200/ em seu navegador.
7. Se a API de backend estiver ativa, os dados serão recebidos e exibidos na aplicação.

## Organização do Projeto:

A seguir, é apresentada a organização dos componentes do projeto:

1. **ClientesService**: Este componente é responsável por realizar as operações CRUD de clientes através de requisições HTTP.

2. **ClientesComponent**: Este componente exibe uma lista de clientes cadastrados, permitindo que o usuário possa excluir ou editar um cliente.

3. **HomeComponent**: Componente que corresponde à página inicial da aplicação.

4. **CadastrarAtualizarClientesComponent**: Este componente exibe um formulário para criar ou editar um cliente.
