// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API de Backend',
      version: '1.0.0',
      description: 'Documentação completa da minha API Node.js para o projeto Fullstack.',
      contact: {
        name: 'Beatriz Leimig',
        url: 'https://seusite.com',
        email: 'seuemail@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000', // Certifique-se que esta URL corresponde à porta do seu backend
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT com o prefixo "Bearer ".',
        },
      },
    },
  },
  // Caminhos para os arquivos que contêm as anotações JSDoc do Swagger
  apis: [
    
    './routes/*.js', // Ou se suas rotas estiverem em arquivos separados na pasta 'routes'
    './controllers/*.js' // Às vezes, as anotações podem ir nos controllers se as rotas estiverem lá
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;