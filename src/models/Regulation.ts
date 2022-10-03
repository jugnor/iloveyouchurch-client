import Joi, { Schema } from 'joi';
import { Except } from 'type-fest';
import { ActivityType } from './ActivityType';
import { PrayerType } from './Prayer';

export interface Regulation {
  id: string;
  postboxId: string;
  prayerAlone: number;
  prayerInGroup: number;
  prayerNight: number;
  bibleReading: number;
  clReading: number;
  thanksGiving: number;
  godGiving: number;
  partialFasting: number;
  completeFasting: number;
  retreat: number;
  choreRepeat: number;
  meditation: number;
  gospel: number;
  gospelContact: number;
  gospelSupport: number;
  createdAt: string;
}

export type UpsertRegulationRequest = Except<
  Regulation,
  'id' | 'postboxId' | 'createdAt'
>;

export const UpsertRegulationRequestSchema: Schema = Joi.object({
  prayerAlone: Joi.number().min(0).required(),
  prayerInGroup: Joi.number().min(0).required(),
  prayerNight: Joi.number().min(0).required(),
  bibleReading: Joi.number().min(0).required(),
  clReading: Joi.number().min(0).required(),
  thanksGiving: Joi.number().min(0).required(),
  godGiving: Joi.number().min(0).required(),
  partialFasting: Joi.number().min(0).required(),
  completeFasting: Joi.number().min(0).required(),
  retreat: Joi.number().min(0).required(),
  choreRepeat: Joi.number().min(0).required(),
  meditation: Joi.number().min(0).required(),
  gospel: Joi.number().min(0).required(),
  gospelContact: Joi.number().min(0).required(),
  gospelSupport: Joi.number().min(0).required()
});

export function instanceOfRegulation(object?: any): object is Regulation {
  if (!object) {
    return false;
  }
  return 'postboxId' in object;
}
