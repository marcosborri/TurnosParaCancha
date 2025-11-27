import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

export function setupSwagger(app: Application) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Reservas de Canchas",
        version: "1.0.0",
        description:
          "Documentación de la API del sistema de reservas de canchas",
      },
    },
    apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
