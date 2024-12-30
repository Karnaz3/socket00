import { ClsStore } from 'nestjs-cls';
import { AdminEntity } from 'src/frameworks/data-services/pg/entities';
import { JwtPayload } from './jwt-playload.interface';
import { IPaginationQuery } from './response/interface/pagination.options.interface';
export interface AppClsStore extends ClsStore {
  adminUser?: AdminEntity;
  user?: IUserClsData;
  doc?: IDocClsData;
  isPublic?: boolean;
  isAdmin?: boolean;
  payload?: JwtPayload;
  paginationQuery?: IPaginationQuery;
  isUser?: boolean;
  isDoc?: boolean;
}

export interface IUserClsData {
  id: number;
  email: string;
  password: string;
}

export interface IDocClsData {
  id: number;
  email: string;
}
