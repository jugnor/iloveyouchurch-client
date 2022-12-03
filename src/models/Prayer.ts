import Joi, { Schema } from 'joi';
import { Except } from 'type-fest';
import { ResultsObject } from './ResultsObject';
import { randomId } from '@mui/x-data-grid-generator';
import { GridColumns, GridRowsProp } from '@mui/x-data-grid';

export enum PrayerType {
  ALONE = 'ALONE',
  GROUP = 'GROUP'
}

export interface Prayer {
  id: string;
  userId: string;
  timeInMinute: number;
  timeInHour: number;
  theme: string;
  prayerNight: number;
  prayerType: PrayerType;
  weekOfYear: number;
  createdAt: Date;
}

export type UpsertPrayerRequest = Except<Prayer, 'id' | 'createdAt' | 'userId'>;

export const CreatePrayerRequestSchema: Schema = Joi.object({
  prayerType: Joi.string()
    .valid(...Object.values(PrayerType))
    .required(),
  timeInMinute: Joi.number().positive().required(),
  theme: Joi.string().optional().allow(''),
  prayerNight: Joi.alternatives().conditional('prayerType', {
    is: PrayerType.GROUP,
    then: Joi.number().min(0).required(),
    otherwise: undefined
  }),
  userTime: Joi.object().required()
});

export const UpsertPrayerRequestSchema: Schema = Joi.object({
  prayerType: Joi.string()
    .valid(...Object.values(PrayerType))
    .required(),
  timeInMinute: Joi.number().positive().required(),
  theme: Joi.string().optional().empty(''),
  prayerNight: Joi.when('prayerType', {
    is: PrayerType.GROUP,
    then: Joi.number().optional(),
    otherwise: Joi.forbidden()
  }),
  weekOfYear: Joi.number().positive()
});

export const prayerRows = (data: ResultsObject<Prayer> | undefined) => {
  let resultMap: readonly { [key: string]: any }[] = [];
  if (data !== undefined) {
    resultMap = data.items.map((x) => ({
      id: randomId(),
      oId: x.id,
      userId: x.userId,
      prayerType: x.prayerType,
      timeInHour: x.timeInHour,
      timeInMinute: x.timeInMinute,
      prayerNight: x.prayerNight,
      theme: x.theme,
      weekOfYear: x.weekOfYear
    }));
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const prayerColumns = (disciplineType: string): GridColumns => [
  {
    field: 'weekOfYear',
    headerName: 'Kalenderwoche',
    width: 300,
    type: 'number',
    editable: false
  },
  {
    field: 'timeInMinute',
    headerName: 'Zeit(min)',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100
  },
  {
    field: 'theme',
    headerName: 'Thema',
    editable: true,
    resizable: true,
    width: 500
  },
  {
    field: 'prayerNight',
    headerName: 'Gebetsnacht',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100,
    hide: disciplineType === PrayerType.ALONE
  }
];
