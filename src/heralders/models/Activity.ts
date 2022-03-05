import Joi, {Schema} from 'joi';
import {Except} from 'type-fest';
import {ActivityOrder} from "./ActivityOrder";
import {ActivityType} from "./ActivityType";

export interface Activity {
  id: string;
  description?: string;
  postboxId: string;
  week: string;
  activityOrder: ActivityOrder;
  activityType: ActivityType;
  createdAt?: string;
}

export type CreateActivityRequest = Except<Activity, 'id' | 'postboxId' | 'createdAt'>;

export type UpdateActivityRequest = CreateActivityRequest;


export const CreateActivityRequestSchema: Schema = Joi.object({
  description: Joi.string().required(),
  activityType: Joi.string().required(),
  week: Joi.string().required(),
  activityOrder: Joi.string().optional().allow('')
});

export const UpdateActivityRequestSchema = CreateActivityRequestSchema;

export function instanceOfActivity(object?: any): object is Activity {
  if (!object) {
    return false;
  }
  return ('postboxId' in object &&
    'week' in object &&
    'description' in object &&
    'activityType' in object);
}
