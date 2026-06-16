import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Agente Moda API",
      version: "1.0.0",
      description: "API para controle de pedidos",
    },
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

export default specs;