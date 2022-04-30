import Joi, {Schema} from 'joi';
import {Except} from 'type-fest';
import {UserTime} from "./UserTime";

export enum ReadingType{
  BIBLE='bible',
  C_BOOK='cBook'
}

export interface Reading {
  id:string;
  title:string;
  timeInMinute:number;
  timeInHour:number;
  theme:string;
  referenceEnd:string;
  totalCap:number;
  theEnd:boolean;
  readingType:ReadingType;
  userTime: UserTime;
  createdAt?: Date;
}

export type UpsertReadingRequest = Except<Reading, 'id'  | 'createdAt'>;


export const UpsertReadingRequestSchema  : Schema = Joi.object({
  readingType:Joi.string().required(),
  totalCap:Joi.number().positive().required().min(0),
  referenceEnd:Joi.string().optional().empty(''),
  timeInMinute: Joi.number().optional().min(0),
  theme: Joi.string().optional().empty(''),
  theEnd:Joi.boolean().optional().default(false),
  title:Joi.string().required(),
  userTime: Joi.object().optional()
});

