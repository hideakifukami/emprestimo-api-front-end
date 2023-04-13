# CodeBank - FrontEnd

Este projeto foi criado com a utilização de Angular e BootStrap, com o intuito de acessar uma API CRUD de gerenciamento de clientes a partir de requisições HTTP. Também foi utiliado a biblioteca "SweetAlert2". 

## Como rodar?

Para rodar, basta acessar a pasta do projeto e digitar `ng serve`. Depois, navegar até `http://localhost:4200/`. A aplicação irá funcionar, e caso a API de BackEnd esteja ativa, os dados serão recebidos.

## Organização:

1. **ClientesService**: Este componente detém todas operações  http de crud de clientes e permite que a aplicação liste, crie, edite e exclua clientes.

2. **ClientesComponent**: Este componente exibe uma lista de clientes cadastrados e seus dados, permitindo que o usuário possa também excluir ou editar o cliente.

3. **HomeComponent**: Componente que corresponde a uma página inicial simples.

4. **CadastrarAtualizarClientesComponent**: Este componente exibe um formulário para criar ou editar um cliente.
