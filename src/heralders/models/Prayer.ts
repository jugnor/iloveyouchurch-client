import Joi, {Schema} from 'joi';
import {Except} from 'type-fest';
import {UserTime} from "./UserTime";

export enum PrayerType {
  ALONE = 'ALONE',
  GROUP = 'GROUP'
}

export interface Prayer {
  id: string;
  timeInMinute: number;
  timeInHour: number;
  theme: string;
  fridayPrayer: boolean;
  prayerType: PrayerType;
  userTime: UserTime;
  createdAt?: Date;
}

export type UpsertPrayerRequest = Except<Prayer, 'id' | 'createdAt'>;


export const CreatePrayerRequestSchema: Schema = Joi.object({
  prayerType: Joi.string()
  .valid(...Object.values(PrayerType))
  .required(),
  timeInMinute: Joi.number().positive().required(),
  theme: Joi.string().optional().allow(''),
  fridayPrayer: Joi.alternatives().conditional('prayerType', {
    is: PrayerType.GROUP,
    then: Joi.boolean().required(),
    otherwise:null
  }),
  userTime: Joi.object().required()
});

export const UpdatePrayerRequestSchema: Schema = Joi.object({
  prayerType: Joi.string()
  .valid(...Object.values(PrayerType))
  .required(),
  timeInMinute: Joi.number().positive().required(),
  theme: Joi.string().optional().empty(''),
  fridayPrayer: Joi.alternatives().conditional('prayerType', {
    is: PrayerType.GROUP,
    then: Joi.boolean().required(),
    otherwise:null
  }),
});

