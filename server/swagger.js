const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'VEHIFY API',
        version: '1.0.0',
        description: 'API documentation for VEHIFY',
      },
      servers:[
          {
              url:'http://localhost:8080/'
          }
      ]
    },
    apis: ['./routes/*.js'],// Path to the routes file
  };
  
  // Initialize Swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options);
  
  module.exports = (app) => {
    // Serve Swagger API documentation
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  };
  