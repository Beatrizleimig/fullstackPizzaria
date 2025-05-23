const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Versão da especificação OpenAPI
    info: {
      title: 'Minha API Node.js com Swagger', // Título da sua API
      version: '1.0.0', // Versão da sua API
      description: 'Documentação da API do meu projeto Node.js com Express e Swagger.',
      contact: {
        name: 'Beatriz Leimig',
        url: 'https://seusite.com', // Opcional: seu site ou LinkedIn
        email: 'seuemail@example.com', // Opcional: seu email
      },
    },
    servers: [ // Definição dos servidores da API
      {
        url: 'http://localhost:3000', // URL base do seu backend em desenvolvimento
        description: 'Servidor de Desenvolvimento',
      },
      // {
      //   url: 'https://api.seusitedeproducao.com', // Opcional: URL do backend em produção
      //   description: 'Servidor de Produção',
      // },
    ],
    components: {
      securitySchemes: {
        bearerAuth: { // Definição de esquema de segurança (ex: JWT)
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT com o prefixo "Bearer " (Bearer token).',
        },
      },
    },
    security: [ // Segurança global (opcional, pode ser definida por rota)
      // {
      //   bearerAuth: [], // Se todas as rotas exigirem JWT por padrão
      // }
    ]
  },
  // Caminhos para os arquivos que contêm as anotações JSDoc do Swagger
  apis: ['./server.js', './routes/*.js'], // Adapte conforme a estrutura do seu projeto
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec; 