import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    console.log('Request:', req.method, req.url);
    if (req.body) {
      console.log('Request body:', req.body);
    }
    next();
  });

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
