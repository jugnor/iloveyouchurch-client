import Joi, {Schema} from 'joi';

export interface UserTime {
  userId?: string;
  postboxId?: string;
  startWeek: string;
  endWeek: string;
  week:string;
}

export const CreateUserTimeRequestSchema: Schema = Joi.object({
  userId: Joi.string().optional(),
  postboxId: Joi.string().optional(),
  startWeek: Joi.string().required(),
  endWeek: Joi.string().required(),
  week: Joi.string().required(),
});

export function instanceOfActivity(object?: any): object is UserTime {
  if (!object) {
    return false;
  }
  return ('postboxId' in object &&
    'userId' in object &&
    'startWeek' in object &&
    'endWeek' in object &&
    'week' in object);
}
