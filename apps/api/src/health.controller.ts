import {Controller, Get} from "@nestjs/common";

@Controller("health")
export class HealthController {
   @Get()
   health() {
      return {ok: true, service: "hhbot-apiA", time: new Date().toISOString()};
   }
}
