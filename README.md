# OpenFarm

Projeto open farm para ajudar produtores, agricultores e estudantes nos projetos relacionados a agropecuária.
O Objetivo do sistema consistem fazer simulação da produção com a maior quantidade possível de dados da microrregião, antecipando problemas e subsidiando a tomada de decisão.

## Configurar o ambiente

O projeto usa mongoDB como banco de dados, reactjs para front-end e java spring-boot para backend

Instale o mongodb no ambiente local.
[passos para instalação](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

Apos instalação inicie o serviço. No ubuntu execute o comando abaixo

```bash
sudo systemctl start mongod
```

Entre no diretório front-end e instale as dependências do react

```bash
npm install
```

Entre no diretório back-end e execute o spring:
```bash
mvn spring-boot:run
```

Para os processos que rodam em background é necessário rodar o projeto no diretório back-ground:
```bash
mvn spring-boot:run
```

Apos concluido a execução dos serviços de back-end, pode executar o serviço do front-end:
```bash
npm start
```
