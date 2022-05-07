import Joi, {Schema} from 'joi';
import {Except} from 'type-fest';
import {UserTime} from "./UserTime";
import {GospelType} from "./Gospel";

export enum GodGivingType{
  CHORE="CHORE",
  MONEY="MONEY",
  THANKS="THANKS"
}
export interface GodGiving {
  id: string;
  godGivingType:GodGivingType;
  amount: number;
  total:number;
  timeInMinute:number;
  timeInHour:number;
  description:string;
  presence:boolean;
  userTime: UserTime;
  createdAt?: string;
}

export type UpsertGodGivingRequest = Except<GodGiving, 'id' | 'createdAt'>;



export const CreateGodGivingRequestSchema: Schema = Joi.object({
  godGivingType: Joi.string()
  .valid(...Object.values(GodGivingType))
  .required(),
  amount: Joi.alternatives().conditional('godGivingType', {
    is: GodGivingType.MONEY ,
    then: Joi.number().positive().required(),
    otherwise:null
  }),
  total: Joi.alternatives().conditional('godGivingType', {
    is: GodGivingType.THANKS ,
    then: Joi.number().positive().required(),
    otherwise:null
  }),
  timeInMinute: Joi.alternatives().conditional('godGivingType', {
    is: GodGivingType.THANKS ,
    then: Joi.number().min(0).optional(),
    otherwise:null
  }),
  presence: Joi.alternatives().conditional('godGivingType', {
    is: GodGivingType.CHORE ,
    then: Joi.boolean().optional().allow(false),
    otherwise:null
  }),
  description: Joi.string().optional().empty(''),
  userTime: Joi.object().required(),
});

export const UpdateGodGivingRequestSchema  : Schema = Joi.object({
  godGivingType: Joi.string()
  .valid(...Object.values(GodGivingType))
  .required(),
  amount: Joi.alternatives().conditional('godGivingType', {
    is: GodGivingType.MONEY ,
    then: Joi.number().positive().required(),
    otherwise:null
  }),
  total: Joi.alternatives().conditional('godGivingType', {
    is: GodGivingType.THANKS ,
    then: Joi.number().positive().required(),
    otherwise:null
  }),
  timeInMinute: Joi.alternatives().conditional('godGivingType', {
    is: GodGivingType.THANKS ,
    then: Joi.number().min(0).optional(),
    otherwise:null
  }),
  presence: Joi.alternatives().conditional('godGivingType', {
    is: GodGivingType.CHORE ,
    then: Joi.boolean().optional().allow(false),
    otherwise:null
  }),
  description: Joi.string().optional().empty(''),
});
export function instanceOfActivity(object?: any): object is GodGiving {
  if (!object) {
    return false;
  }
  return ('postboxId' in object &&
    'amount' in object &&
    'godGivingType' in object &&
    'userTime' in object);
}
