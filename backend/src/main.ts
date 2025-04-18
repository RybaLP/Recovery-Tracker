import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: "http://localhost:5173",
    methods : "GET,HEAD,PUT,PATCH,POST,DELETE",
  })

  const config = new DocumentBuilder()
  .setTitle('Recovery Api')
  .setDescription('Test api on your own with swagger!')
  .setVersion('1.0')
  .addTag('addictions')
  .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-tests', app, documentFactory);
  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
