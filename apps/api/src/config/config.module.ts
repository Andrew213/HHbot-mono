import {DynamicModule, Global, Module} from "@nestjs/common";

import {ConfigService} from "./config.service";

@Global()
@Module({})
export class ConfigModule {
   static forRoot(): DynamicModule {
      return {
         module: ConfigModule,
         global: true,
         providers: [ConfigService],
         exports: [ConfigService],
      };
   }
}
