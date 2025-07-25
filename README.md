# Desafio Técnico - Desenvolvedor Back-end

Desafio técnico para a vaga de Desenvolvedor Back-End na InMeta.

## Como iniciar este projeto

### Docker

<details>
  <summary>Passo a Passo - Inicialização do banco com Docker</summary>
  <ul>
    <li>Clone o repositório na sua máquina.</li>
    <li>Na raíz do projeto renomeie o arquivo <code>.env.example</code>, apagando a extensão <code>.example</code>.</li>
    <li>Caso não tenha, instale o Docker de acordo com seu sistema operacional <a href='https://docs.docker.com/engine/install/ubuntu/' target='_blank'>clicando aqui</a> e seguindo os passos.</li>
    <li>Depois instale o Docker Compose <a href='https://docs.docker.com/engine/install/ubuntu/' target='_blank'>clicando aqui</a> e seguindo os passos.</li>
    <li>Em seguida, na pasta raíz do projeto, rode o comando <code>docker compose up --build -d</code>. Este comando iniciará o Docker Compose e fará o build das etapas necessárias para que a aplicação rode localmente.</li>
  </ul>
</details>

### API

Antes de iniciar, certifique-se de ter instalado o Docker e ter seguido todos os passos anteriores e deixar a aplicação rodando, porque o banco está persistindo nele.

<details>
  <summary>Passo a Passo - Iniciando da API</summary>
  <ul>
    <li>Na raíz do projeto, rode o comando <code>npm install</code> para instalar as dependências.</li>
    <li>Depois, na linha de comando, digite o comando <code>npm run migrate:up</code> para gerar as migrations do banco.</li>
    <li>Depois, digite o comando <code>npm run start:dev</code> para iniciar em ambiente de desenvolvimento a aplicação na rota <code>localhost:3000</code>(ou outra porta que você especificar no arquivo <code>.env</code>).</li>
    <li>Por fim, para testar a API faça uma requisição do tipo <strong>POST</strong> para a rota <code>http://localhost:3000/api/auth/signup</code> (rota de criação de usuário), passando os seguintes parâmetros:</li>
    <code>{ "name": "Wesley", "email": "teste@teste.com.br", "password": "123456" }</code>
    <li>Mais detalhes sobre rotas de testes serão abordados na documentação (veja o tópico "Documentação").</li>
  </ul>
</details>

### Testes

<details>
  <summary>Passo a Passo - Iniciando os Testes</summary>
  <ul>
    <li>Após os passos anteriores, rode o comando <code>npm run test</code> para rodar os testes.</li>
  </ul>
</details>

## Documentação

Após iniciar a aplicação, entre na rota `localhost:3000/documentation` para encontrar a documentação das rotas da API.

## Tecnologias utilizadas

- [x] Typescript
- [x] Node.js
- [x] Express
- [x] Docker
- [x] Postgres
- [x] Swagger
- [x] JWT
- [x] Git

## Desenvolvimento

<table>
  <tr>
    <td style='border=1px solid #ddd; align="center'>
      <a href="https://github.com/wesleysantossts">
        <img src="https://avatars.githubusercontent.com/u/56703526?v=4" width="100px" alt="Wesley Santos"/>
        <br/>
        <sub>Wesley Santos</sub>
      </a>
    </td>
  </tr>
</table>
