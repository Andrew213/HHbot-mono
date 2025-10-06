/* eslint-disable @typescript-eslint/no-explicit-any */
import * as cheerio from "cheerio";

import {INN_RE, KadItem, KadPage, Party} from "../types";

function textClean(s?: string | null) {
   return (
      s
         ?.replace(/\u00A0/g, " ")
         .replace(/\s+/g, " ")
         .trim() || null
   );
}

const pickName = ($span: cheerio.Cheerio<any>) =>
   textClean(
      $span
         .contents()
         .filter((_, n) => n.type === "text")
         .text(),
   );

const pickInn = ($container: cheerio.Cheerio<any>) => {
   const t = $container.text().replace(/\u00A0/g, " ");
   return t.match(INN_RE)?.[1] ?? null;
};

export function parseKadList(html: string): KadPage {
   const $ = cheerio.load(`<root>${html}</root>`, {xmlMode: true});
   const items: KadItem[] = [];

   $("tr").each((_, tr) => {
      const row = $(tr);

      const a = row.find("td.num a.num_case").first();
      const caseNumber = textClean(a.text());
      const caseUrl = a.attr("href") || null;

      const judge = textClean(row.find("td.court .judge").first().text());
      const court =
         textClean(
            row.find("td.court .b-container > div[title]").last().attr("title"),
         ) || textClean(row.find("td.court .b-container > div").last().text());

      // истец
      const $pl = row.find("td.plaintiff .js-rollover").first();
      const plaintiff: Party | null = $pl.length
         ? {
              name: pickName($pl)!,
              inn: pickInn($pl.find(".js-rolloverHtml").first()),
           }
         : null;

      // РЕСПОНДЕНТ
      const $resp = row.find("td.respondent .js-rollover").first();
      const respondent: Party | null = $resp.length
         ? {
              name: pickName($resp)!,
              inn: pickInn($resp.find(".js-rolloverHtml").first()),
           }
         : null;
      items.push({
         caseNumber,
         caseUrl,
         court,
         judge,
         plaintiff,
         respondent,
      });
   });

   const meta: KadPage["meta"] = {
      pageSize: Number($("#documentsPageSize").val() || ""),
      page: Number($("#documentsPage").val() || ""),
      totalCount: Number($("#documentsTotalCount").val() || ""),
      pagesCount: Number($("#documentsPagesCount").val() || ""),
   };

   return {items, meta};
}
