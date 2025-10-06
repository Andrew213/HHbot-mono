import {Body, Controller, Inject, Post} from "@nestjs/common";

import {SearchInstancesDto} from "./dto/search-instance.dto";
import {KadService} from "./kad.service";

@Controller("kad")
export class KadController {
   constructor(@Inject(KadService) private readonly kad: KadService) {}

   @Post("search-instances")
   async searchInstances(@Body() dto: SearchInstancesDto) {
      return this.kad.searchInstances(dto);
   }
}
