import Joi, {Schema} from 'joi';
import {Except} from 'type-fest';
import {UserTime} from "./UserTime";

export interface GodGiving {
  id: string;
  amount: number;
  postboxId: string;
  type: string;
  userTime: UserTime;
  createdAt?: string;
}

export type CreateGodGivingRequest = Except<GodGiving, 'id' | 'postboxId' | 'createdAt'>;

export type UpdateGodGivingRequest = CreateGodGivingRequest;


export const CreateGodGivingRequestSchema: Schema = Joi.object({
  amount: Joi.number().required(),
  type: Joi.string().optional().empty(''),
  userTime: Joi.object().required()
});

export const UpdateGodGivingRequestSchema  : Schema = Joi.object({
  amount: Joi.number().required(),
  type: Joi.string().optional().empty(''),
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
