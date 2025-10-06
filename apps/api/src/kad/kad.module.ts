import {HttpModule} from "@nestjs/axios";
import {Module} from "@nestjs/common";

import {KadController} from "./kad.controller";
import {KadService} from "./kad.service";

@Module({
   imports: [
      HttpModule.registerAsync({
         useFactory: () => {
            return {
               timeout: 15000,
               maxRedirects: 0,
            };
         },
      }),
   ],
   controllers: [KadController],
   providers: [KadService],
   exports: [KadService],
})
export class KadModule {}
