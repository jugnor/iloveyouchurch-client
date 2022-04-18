import Joi, {Schema} from 'joi';
import {Except} from 'type-fest';
import {UserTime} from "./UserTime";

export interface BibleReading {
  id:string;
  referenceEnd:string;
  timeInMinute:number;
  theme:string;
  theEnd:boolean;
  total:number;
  userTime: UserTime;
  createdAt?: string;
}

export type CreateBibleReadingRequest = Except<BibleReading, 'id'  | 'createdAt'>;

export type UpdateBibleReadingRequest = CreateBibleReadingRequest;


export const CreateBibleReadingRequestSchema: Schema = Joi.object({
  referenceEnd:Joi.string().optional().empty(''),
  timeInMinute: Joi.number().optional().min(0),
  theme: Joi.string().optional().empty(''),
  theEnd:Joi.boolean().optional().default(false),
  total:Joi.number().positive().required(),
  userTime: Joi.object().required()
});

export const UpdateBibleReadingRequestSchema  : Schema = Joi.object({
  referenceEnd:Joi.string().optional().empty(''),
  timeInMinute: Joi.number().optional().min(0),
  theme: Joi.string().optional().empty(''),
  theEnd:Joi.boolean().optional().default(false),
  total:Joi.number().positive().required(),
});

