<h1 align="center">
  <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/masterclass.png" width="120px" />
</h1>

<h3 align="center">
  Estudo: Controle de fluxo e processos com Aws Step functions
  Step Functions facilita a coordenação de componentes aplicações serverless e microserviços utilizando workflows visuais. Isso facilita a construção e o monitoramento de aplicações que escalam. 
</h3>

<p align="center">Esse projeto foi baseado AWS Step Functions Crash Course</p>

Link do Video no [youtube](https://www.youtube.com/watch?v=jXxKRd_9nC0)

## Motivação
Ao utilizar microserviços para construir aplicações pode existir situações onde precisamos controlar um processo complexo de forma distribuida.
A orquestração de serviço representa um único processo de negócios executável centralizado (o orquestrador) que coordena a interação entre diferentes serviços. O orquestrador é responsável por invocar e combinar os serviços.

O relacionamento entre todos os serviços participantes é descrito por um único terminal (ou seja, o serviço composto). A orquestração inclui o gerenciamento de transações entre serviços individuais. A orquestração emprega uma abordagem centralizada para a composição do serviço.

Esse projeto simula um processo de checkout pra compra de livros que inclui gerenciamento de erros e falhas, retentativas, padrão saga da resetar o estado da máquina de estados e integração com SQS (Simple Queue Service), SNS (Amazon Simple Notification Service) e DynamoDB.

<h1 align="center">
  <img alt="storeCheckout" src="https://github.com/quixote15/aws-stepFunction-storeCheckout/blob/main/assets/stepfunctions_graph.png" width="600px" height="600px" />
</h1>

## ✋🏻 Pré-requisitos

- [Node.js](https://nodejs.org/en/)
- [AWS CLI](https://aws.amazon.com/pt/cli/)
- [Serverless](https://www.serverless.com/)
- [serverless-step-functions](https://www.serverless.com/plugins/serverless-step-functions)

## 🔥 Instalação e execução

1. Faça um clone desse repositório;
2. Entre na pasta `cd aws-stepFunction-storeCheckout`;
3. Rode `npm install` para instalar as dependências ;
4. Com sua conta Aws configurada execute `sls deploy`;


## ⚡️ Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## Vantagens De Usar StepFunctions

1. Observabilidade e monitoramento de ponta a ponta no processo. 
2. Facilidade de implementar timeout e reagir a isso. 
3. A lógica de negócio fica em um unico lugar portanto fica facil de entender e dar manutenço.
2. Possibilita Auditoria de cada task que entrou no workflow
3. Funciona como um Orquestrador de microserviços, tira a necessidade de implementar do zero o padrão SAGA


## Desvantagens

1. Single point of Failure (único ponto de falha). Se StepFunctions cair nada funciona, porém a infra serveless da aws faz com que isso seja virtualmente improvável
2. Alto custo (USD 60 por milhão de transações)

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

