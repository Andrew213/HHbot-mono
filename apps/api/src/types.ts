export type Party = {name: string; inn?: string | null | undefined};

export type KadItem = {
   caseNumber?: string | null;
   caseUrl?: string | null;
   court?: string | null;
   judge?: string | null;
   plaintiff?: Party | null;
   respondent: Party | null;
};

export type KadPage = {
   items: KadItem[];
   meta: {
      pageSize?: number;
      page?: number;
      totalCount?: number;
      pagesCount?: number;
   };
};

export const INN_RE = /ИНН:\s*([0-9]{10,12})/;
