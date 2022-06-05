import {PostboxType} from "./PostboxType";

export interface PostboxModel {
  id: string;
  name: string;
  postboxType:PostboxType;
  ownerId: string;
  description: string;
  createdAt?: string;
}
