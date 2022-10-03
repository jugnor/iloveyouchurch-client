import { Except } from 'type-fest';
import Joi, { Schema } from 'joi';

export interface PostboxModel {
  id: string;
  name: string;
  postboxType: PostboxType;
  ownerId: string;
  description: string;
  createdAt?: string;
}
export enum PostboxType {
  DEPARTMENT = 'DEPARTMENT',
  SYSTEM = 'SYSTEM'
}
export type UpsertPostboxRequest = Except<PostboxModel, 'id' | 'createdAt'>;

export const CreatePostboxRequestSchema: Schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  postboxType: Joi.string().required()
});

export const UpdatePostboxRequestSchema = CreatePostboxRequestSchema;
