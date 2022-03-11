import Joi, {Schema} from 'joi';
import {Except} from 'type-fest';
import {ActivityOrder} from "./ActivityOrder";
import {ActivityType} from "./ActivityType";

export interface Activity {
  id: string;
  description?: string;
  postboxId: string;
  activityOrder: ActivityOrder;
  activityType: ActivityType;
  createdAt?: string;
}

export type CreateActivityRequest = Except<Activity, 'id' | 'postboxId' | 'createdAt'>;

export type UpdateActivityRequest = CreateActivityRequest;


export const CreateActivityRequestSchema: Schema = Joi.object({
  description: Joi.string().required(),
  activityType: Joi.string().required(),
  activityOrder: Joi.string().required()
});

export const UpdateActivityRequestSchema = CreateActivityRequestSchema;

export function instanceOfActivity(object?: any): object is Activity {
  if (!object) {
    return false;
  }
  return ('postboxId' in object &&
    'activityOrder' in object &&
    'description' in object &&
    'activityType' in object);
}
