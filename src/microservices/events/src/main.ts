import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import morgan from 'morgan';
import bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.use(morgan('combined'));

  app.use(
    bodyParser.text({
      type: '*/*',
      verify: (req: any, res, buf) => {
        req.rawBody = buf.toString();
        console.log('Raw text body:', req.rawBody);
      },
    }),
  );

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
