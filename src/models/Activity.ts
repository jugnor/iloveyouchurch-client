import Joi, {Schema} from 'joi';
import {Except} from 'type-fest';
import {ActivityType} from "./ActivityType";

export interface Activity {
  id: string;
  description?: string;
  postboxId: string;
  activityOrder: string;
  activityType: ActivityType;
  createdAt?: string;
}

export type UpsertActivityRequest = Except<Activity, 'postboxId' | 'createdAt'>;

export const UpsertActivityRequestSchema: Schema = Joi.object({
  activityType: Joi.string()
  .valid(...Object.values(ActivityType))
  .required(),
  description: Joi.string().required(),
  activityOrder: Joi.alternatives().conditional('godGivingType', {
    is: ActivityType.PROGRAM,
    then: Joi.string().required(),
    otherwise: Joi.string().optional().allow('', null)
  })
});

export function instanceOfActivity(object?: any): object is Activity {
  if (!object) {
    return false;
  }
  return ('postboxId' in object &&
    'activityOrder' in object &&
    'description' in object &&
    'activityType' in object);
}
