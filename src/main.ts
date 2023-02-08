import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MyValidationPipe } from './pipes/MyValidation.pipe';


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin:["*"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  const config = new DocumentBuilder()
    .setTitle("Mebel marketplace")
    .setDescription("Documentation for REST API")
    .setVersion("1.0.0")
    .addTag("Sandik")
    .addBearerAuth(
      undefined,
      'defaultBearerAuth',
    )
    .build();
  const documentation = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup("/api/docs",app,documentation)
  app.useGlobalPipes(new MyValidationPipe());
  await app.listen(3000);
}
bootstrap();
