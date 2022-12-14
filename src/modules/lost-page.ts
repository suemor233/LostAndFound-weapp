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
  _id: string;
  uid: string;
  title: string;
  contact: string;
  category: string;
  foundTime: string;
  place:string
  detail: string;
  image?: string[];
  cover: string;
  user:userType;
  state: boolean;
  created: string;
  updated: string;
}

export interface LostDatum {
  state: boolean;
  _id: string;
  uid: string;
  title: string;
  contact: string;
  cover: string;
  place:string
  category: string;
  lostTime: string;
  detail: string;
  image: string[];
  user:userType
  created: string;
  updated: string;
}
