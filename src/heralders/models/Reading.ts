import Joi, {Schema} from 'joi';
import {Except} from 'type-fest';
import {UserTime} from "./UserTime";
import {GospelType} from "./Gospel";

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


export const CreateReadingRequestSchema  : Schema = Joi.object({
  readingType:Joi.string().required(),
  totalCap:Joi.number().positive().min(0).required(),
  referenceEnd:Joi.string().optional().allow(''),
  timeInMinute: Joi.number().optional().min(0),
  theme: Joi.string().optional().allow(''),
  theEnd:Joi.boolean().optional().allow(false),
  title:Joi.alternatives().conditional('readingType', {
    is: ReadingType.C_BOOK,
    then: Joi.string().required(),
    otherwise:Joi.string().optional().allow('')
  }),
  userTime: Joi.object().required()
});

export const UpdateReadingRequestSchema  : Schema = Joi.object({
  readingType:Joi.string().required(),
  totalCap:Joi.number().positive().min(0).required(),
  referenceEnd:Joi.string().optional().allow(''),
  timeInMinute: Joi.number().optional().min(0),
  theme: Joi.string().optional().allow(''),
  theEnd:Joi.boolean().optional().allow(false),
  title:Joi.alternatives().conditional('readingType', {
    is: ReadingType.C_BOOK,
    then: Joi.string().required(),
    otherwise:Joi.string().optional().allow('')
  }),
});

