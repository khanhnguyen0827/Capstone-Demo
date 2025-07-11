import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Capstone API',
      version: '1.0.0',
      description: 'API documentation for Capstone project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/common/swagger/*.js'], // files containing annotations
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
