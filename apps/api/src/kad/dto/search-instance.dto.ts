import {Transform} from "class-transformer";
import {
   IsArray,
   IsBoolean,
   IsInt,
   IsISO8601,
   IsOptional,
   IsString,
   Max,
   Min,
} from "class-validator";

// Утилита: нормализуем YYYY-MM-DD
const toDateYMD = (v: string) => {
   if (!v) return v;
   // Оставим как есть, если уже YYYY-MM-DD
   if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
   const d = new Date(v);
   if (Number.isNaN(d.getTime())) return v;
   const mm = String(d.getMonth() + 1).padStart(2, "0");
   const dd = String(d.getDate()).padStart(2, "0");
   return `${d.getFullYear()}-${mm}-${dd}`;
};

export class SearchInstancesDto {
   @IsISO8601()
   @Transform(({value}) => toDateYMD(value))
   DateFrom!: string;

   @IsISO8601()
   @Transform(({value}) => toDateYMD(value))
   DateTo!: string;

   @IsOptional()
   @IsInt()
   @Min(1)
   Page: number = 1;

   @IsOptional()
   @IsInt()
   @Min(1)
   @Max(200)
   Count: number = 25;

   @IsOptional()
   @IsArray()
   @IsString({each: true})
   Courts: string[] = [];

   @IsOptional()
   @IsArray()
   @IsString({each: true})
   Sides: string[] = [];

   @IsOptional()
   @IsArray()
   @IsString({each: true})
   Judges: string[] = [];

   @IsOptional()
   @IsArray()
   @IsString({each: true})
   CaseNumbers: string[] = [];

   @IsOptional()
   @IsBoolean()
   WithVKSInstances: boolean = false;
}
