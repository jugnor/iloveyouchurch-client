import Joi, {Schema} from 'joi';
import {Except} from 'type-fest';
import {UserTime} from "./UserTime";

export enum RetreatType {
  MEDITATION = 'MEDITATION',
  RETREAT = 'RETREAT'
}

export interface Meditation {
  id: string;
  timeInMinute: number;
  timeInHour: number;
  theme: string;
  verse: string;
  total:number;
  retreatType: RetreatType;
  userTime: UserTime;
  createdAt?: Date;
}

export type UpsertMeditationRequest = Except<Meditation, 'id' | 'createdAt'>;


export const CreateMeditationRequestSchema: Schema = Joi.object({
  retreatType: Joi.string()
  .valid(...Object.values(RetreatType))
  .required(),
  timeInMinute: Joi.number().min(0).required(),
  total: Joi.number().min(0).required(),
  theme: Joi.string().optional().allow(''),
  verse: Joi.string().optional().allow(''),
  userTime: Joi.object().required()
});

export const UpdateMeditationRequestSchema: Schema = Joi.object({
  prayerType: Joi.string()
  .valid(...Object.values(RetreatType))
  .required(),
  timeInMinute: Joi.number().required().min(0),
  total: Joi.number().min(0).required(),
  theme: Joi.string().optional().empty(''),
  verse: Joi.string().optional().allow(''),
});

