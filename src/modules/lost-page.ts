export interface lostFoundType {
  lostFound: LostFound[];
  totalCount: number;
}

export interface LostFound {
  lostData: LostDatum[];
  lengthCurrent: number;
  pageCurrent: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  foundData: FoundDatum[];
}

export interface FoundDatum {
  id: string;
  uid: string;
  title: string;
  contact: string;
  category: string;
  foundTime: string;
  detail: string;
  image: string;
  state: boolean;
  created: string;
  updated: string;
}

export interface LostDatum {
  state: boolean;
  id: string;
  uid: string;
  title: string;
  contact: string;
  category: string;
  lostTime: string;
  detail: string;
  image: string;
  created: string;
  updated: string;
}
