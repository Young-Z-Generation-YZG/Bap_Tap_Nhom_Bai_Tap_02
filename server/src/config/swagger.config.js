const port = 3000 || process.env.PORT
module.exports = options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library APIs",
      version: "1.0.0",
      description: "Clothing store library APIs",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
    components: {
      responses: {},
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/**/*.js"],
};