import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions, SwaggerCustomOptions } from '@nestjs/swagger';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './prisma/prisma-exception.filter';
import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';
import { ResponseObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { MatchesModule } from './matches/matches.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalFilters(new PrismaExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  const config = new DocumentBuilder()
    .setTitle('SportsBall API')
    .setDescription('Simple school project API for managing sports teams, players and their matches with Prisma and NestJS')
    .setVersion('v1.0')
    .build();
  const options: SwaggerDocumentOptions = {
    include: [TeamsModule, PlayersModule, MatchesModule],
  };
  const swaggerOptions: SwaggerCustomOptions = {
    customfavIcon: '/football.png',
    customSiteTitle: 'SportsBall API Documentation',
    explorer: true,
  };
  const document =  SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('api', app, document, swaggerOptions);
  
  
  await app.listen(3000);
}
bootstrap();
