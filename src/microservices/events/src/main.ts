import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Нужно, чтобы body-parser не ломался сразу
  app.use((req, res, next) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      console.log('Raw request body:', data);
      next();
    });
  });

  // Обычные парсеры Nest
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: { brokers: ['kafka:9092'] },
      consumer: {
        groupId: 'events-service-group',
        allowAutoTopicCreation: true,
      },
    },
  });

  await app.startAllMicroservices();
  console.log('Kafka microservice connected');

  await app.listen(Number(process.env.PORT) || 8082, '0.0.0.0');
}

bootstrap();
