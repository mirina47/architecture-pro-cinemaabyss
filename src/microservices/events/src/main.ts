import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: { brokers: ['kafka:9092'] },
    },
  });

  await app.startAllMicroservices();
  console.log('Kafka microservice connected');

  await app.listen(Number(process.env.PORT) || 8082, '0.0.0.0');
}

bootstrap();
