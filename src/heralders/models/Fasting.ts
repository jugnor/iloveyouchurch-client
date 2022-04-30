import Joi, {Schema} from 'joi';
import {Except} from 'type-fest';
import {UserTime} from "./UserTime";

export enum FastingType {
  COMPLETE = 'complete',
  PARTIAL = 'partial'
}

export interface Fasting {
  id: string;
  goal: string;
  days: number;
  fastingType: FastingType;
  userTime: UserTime;
  createdAt?: Date;
}

export type UpsertFastingRequest = Except<Fasting, 'id' | 'createdAt'>;


export const CreateFastingRequestSchema: Schema = Joi.object({
  retreatType: Joi.string()
  .valid(...Object.values(FastingType))
  .required(),
  days: Joi.number().min(0).required(),
  goal: Joi.string().optional().allow(''),
  userTime: Joi.object().required()
});

export const UpdateFastingRequestSchema: Schema = Joi.object({
  retreatType: Joi.string()
  .valid(...Object.values(FastingType))
  .required(),
  days: Joi.number().min(0).required(),
  goal: Joi.string().optional().allow(''),
});

