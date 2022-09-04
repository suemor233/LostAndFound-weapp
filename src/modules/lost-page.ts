import type { userType } from "./user";

export interface lostFoundType {
  lostFound: LostFound[];
  totalCount: number;
  lost:LostFound
  found:LostFound
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
  cover: string;
  user:userType;
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
  cover: string;
  category: string;
  lostTime: string;
  detail: string;
  image: string[];
  user:userType
  created: string;
  updated: string;
}
