import "reflect-metadata";

import {ValidationPipe} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";

import {AppModule} from "./app.module";

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));

   await app.listen(process.env.PORT ? Number(process.env.PORT) : 4000);

   console.log(`[api] running at http://127.0.0.1:${process.env.PORT || 4000}`);
}
bootstrap();
