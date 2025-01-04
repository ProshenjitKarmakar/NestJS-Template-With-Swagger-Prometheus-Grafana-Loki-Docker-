import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { LoggingInterceptor } from "./logging.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");    
  app.useGlobalInterceptors(new LoggingInterceptor());     

  const config = new DocumentBuilder()
    .setTitle("Nest CRUD API")
    .setDescription("Nest API description")
    .setVersion("0.1")
    .build();

  // Create a Swagger document using the application instance and the document configuration
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger module with the application instance and the Swagger document
  SwaggerModule.setup("api/list", app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
