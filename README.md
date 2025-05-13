# CrudAngularMaterial

Aplicação Angular para gerenciamento de dados de clientes utilizando Angular Material e Flex Layout. Funcionalidades principais:

- Cadastro de clientes
- Armazenamento local usando `localStorage`
- Integração com a [BrasilAPI](https://brasilapi.com.br/) para carregar automaticamente estados e cidades do Brasil
- Layout responsivo com Flex Layout
- Pesquisa e exclusão de clientes com confirmação

## Rotas Disponíveis

- http://localhost:4200/register – Cadastro ou edição de cliente
- http://localhost:4200/search – Busca e gerenciamento de clientes cadastrados

## Primeiros Passos

### Servidor de Desenvolvimento

Execute o servidor de desenvolvimento com:

ng serve

Abra o navegador em http://localhost:4200/. A aplicação será recarregada automaticamente ao alterar os arquivos.

### Build

Para compilar o projeto:

ng build

Os arquivos finais serão gerados na pasta dist/.

## Tecnologias Utilizadas

- Angular 19
- Angular Material
- Flex Layout
- API do navegador localStorage
- BrasilAPI (endpoints do IBGE)

## Funcionalidades do Formulário

- Campo de CPF com máscara
- Data de nascimento com máscara (DD/MM/AAAA)
- Carregamento automático de estados e cidades
- Validação de e-mail
- Geração de ID único com UUID

## Observações para Desenvolvedores

Este projeto utiliza ngModel para binding bidirecional e armazena os dados do cliente de forma persistente no navegador via localStorage.

## Licença

Este projeto é open source e pode ser utilizado livremente para aprendizado e evolução.


# CrudAngularMaterial

An Angular application for managing client data using Angular Material and Flex Layout. It includes features such as:

- Client registration with form
- Local data storage using `localStorage`
- Integration with [BrasilAPI](https://brasilapi.com.br/) to auto-populate Brazilian states and cities
- Responsive layout using Flex Layout
- Data search and deletion with confirmation

## Available Routes

- http://localhost:4200/register – Register or edit client data
- http://localhost:4200/search – Search and manage registered clients

## Getting Started

### Development server

Run the development server:

ng serve

Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Build

To compile the project:

ng build

The build artifacts will be stored in the dist/ directory.

## Technologies

- Angular 19
- Angular Material
- Flex Layout
- localStorage API
- BrasilAPI (IBGE endpoints)

## Client Form Features

- CPF field with input mask
- Birth date with input mask (DD/MM/YYYY)
- Auto-load Brazilian states and cities
- Email validation
- Unique ID generation using UUID

## Developer Notes

This project uses ngModel for two-way data binding and stores client data persistently in the browser using localStorage.

## License

This project is open source and free to use for learning and improvement.
