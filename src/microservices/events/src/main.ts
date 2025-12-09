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
    bodyParser.json({
      verify: (req, res, buf) => {
        console.log('Raw JSON body:', buf.toString());
      },
    }),
  );

  app.use(
    bodyParser.text({
      type: '*/*',
      verify: (req, res, buf) => {
        console.log('Raw text body:', buf.toString());
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
