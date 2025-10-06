// kad.service.ts
import {HttpService} from "@nestjs/axios";
import {
   Inject,
   Injectable,
   InternalServerErrorException,
   OnModuleInit,
} from "@nestjs/common";
import {AxiosInstance} from "axios";
import axiosRetry, {isNetworkOrIdempotentRequestError} from "axios-retry";

import {parseKadList} from "../utils/extractRespondentInn";
import {SearchInstancesDto} from "./dto/search-instance.dto";

@Injectable()
export class KadService implements OnModuleInit {
   private client!: AxiosInstance;
   private readonly baseUrl = "https://kad.arbitr.ru";
   private readonly cookies = `ASP.NET_SessionId=btgfofrk1kfcm1slse2pxyvk; CUID=9cc76536-9934-4cf1-84b6-f17d02b6a9a2:8zCd/K7xjXLOF3qHU8hzxw==; Notification_All=20536b22ab3946a782de78c1652d8b3b_1759734000000_shown; pr_fp=a58cb2218db283c79c723cb859bd2a00ca6f78d0d4cad36be43034d56927d8fe; _ga=GA1.2.198246269.1759432239; _gid=GA1.2.105997886.1759432239; _ym_uid=1759432239413746955; _ym_d=1759432239; _ym_isad=1; is_agree_privacy_policy=true; __ddg1_=HO6HsjdhQ9JDdfzRPEQY; .ASPXAUTH=696496B0FE6228745727C35C6AE4476CD8CFF44C3B4C01FD761FA0C43C7923E0E50EFF94B17609A818118D0AF53BE08F7DFB4BE01B6A1119EE9B7372E4AB998B4B52AF0B6BCDD64F4FD4B67C6A516FF24010BA8480D5AD00175304947565EC94263EC084; _ga_5C6XL8NQPW=GS2.2.s1759432271$o1$g1$t1759432433$j35$l0$h0; rcid=5fbaf634-249d-4e46-a4e8-8d75f16f6e63; __ddg9_=46.172.4.131; _gat=1; _gat_FrontEndTracker=1; _ga_Q2V7P901XE=GS2.2.s1759435545$o2$g0$t1759435545$j60$l0$h0; _ga_9582CL89Y6=GS2.2.s1759435545$o2$g0$t1759435545$j60$l0$h0; __ddg10_=1759435550; __ddg8_=fdqWerjbR0LtocjO; wasm=843e06441137f39b984eb0f6a01785cc`; // лучше в .env
   private readonly ua =
      process.env.KAD_USER_AGENT ??
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

   constructor(@Inject(HttpService) private readonly http: HttpService) {}

   onModuleInit() {
      if (!this.http) {
         // Если сюда попали — HttpModule не импортирован в KadModule
         throw new Error(
            "HttpService not injected. Did you import HttpModule in KadModule?",
         );
      }
      this.client = this.http.axiosRef;

      axiosRetry(this.client, {
         retries: 3,
         retryDelay: n => Math.min(1000 * n, 3000),
         retryCondition: err =>
            (err.response &&
               [429, 403, 502, 503, 504].includes(err.response.status)) ||
            isNetworkOrIdempotentRequestError(err),
      });
   }

   async searchInstances(dto: SearchInstancesDto) {
      try {
         const url = `${this.baseUrl}/Kad/SearchInstances`;
         const {data} = await this.client.post(url, dto, {
            headers: {
               "Content-Type": "application/json;charset=UTF-8",
               Accept: "application/json, text/javascript, */*; q=0.01",
               Origin: this.baseUrl,
               Referer: `${this.baseUrl}/`,
               "User-Agent": this.ua,
               Cookie: this.cookies,
            },
         });

         const kadPageParsed = parseKadList(data);

         console.log(`kadPageParsed `, kadPageParsed);

         return kadPageParsed;

         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
         const status = e?.response?.status;
         const msg = e?.response?.data ?? e?.message ?? "Unknown error";
         throw new InternalServerErrorException({
            message: "KAD request failed",
            status,
            details:
               typeof msg === "string"
                  ? msg.slice(0, 500)
                  : JSON.stringify(msg).slice(0, 500),
         });
      }
   }
}
