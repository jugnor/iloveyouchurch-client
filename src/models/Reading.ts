import Joi, { Schema } from 'joi';
import { Except } from 'type-fest';
import { UserTime } from './UserTime';
import { ResultsObject } from './ResultsObject';
import { Prayer } from './Prayer';
import { randomId } from '@mui/x-data-grid-generator';
import { toDate } from 'date-fns';
import { GridColumns, GridRowsProp } from '@mui/x-data-grid';

export enum ReadingType {
  BIBLE = 'BIBLE',
  C_BOOK = 'C_BOOK'
}

export interface Reading {
  id: string;
  userId: string;
  title: string;
  timeInMinute: number;
  timeInHour: number;
  theme: string;
  referenceEnd: string;
  totalCap: number;
  theEnd: boolean;
  readingType: ReadingType;
  weekOfYear: number;
  createdAt?: Date;
}

export type UpsertReadingRequest = Except<Reading, 'id' | 'createdAt'>;

export const CreateReadingRequestSchema: Schema = Joi.object({
  readingType: Joi.string().required(),
  totalCap: Joi.number().positive().required(),
  referenceEnd: Joi.string().optional().allow(''),
  timeInMinute: Joi.number().min(0).optional(),
  theme: Joi.string().optional().allow(''),
  theEnd: Joi.boolean().optional().allow(false),
  title: Joi.alternatives().conditional('readingType', {
    is: ReadingType.C_BOOK,
    then: Joi.string().required(),
    otherwise: null
  }),
  userTime: Joi.object().required()
});

export const UpdateReadingRequestSchema: Schema = Joi.object({
  readingType: Joi.string().required(),
  totalCap: Joi.number().positive().required(),
  referenceEnd: Joi.string().optional().allow(''),
  timeInMinute: Joi.number().min(0).optional(),
  theme: Joi.string().optional().allow(''),
  theEnd: Joi.boolean().optional().allow(false),
  title: Joi.alternatives().conditional('readingType', {
    is: ReadingType.C_BOOK,
    then: Joi.string().required(),
    otherwise: null
  })
});

export const readingRows = (data: ResultsObject<Reading> | undefined) => {
  let resultMap: readonly { [key: string]: any }[] = [];
  if (data !== undefined) {
    resultMap = data.items.map((x) => ({
      id: randomId(),
      oId: x.id,
      userId: x.userId,
      readingType: x.readingType,
      totalCap: x.totalCap,
      title: x.title,
      referenceEnd: x.referenceEnd,
      timeInMinute: x.timeInMinute,
      timeInHour: x.timeInHour,
      theEnd: x.theEnd,
      theme: x.theme,
      weekOfYear: x.weekOfYear
    }));
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const meditationColumns = (type: string): GridColumns => [
  {
    field: 'weekOYear',
    headerName: 'Kalenderwoche',
    width: 200,
    type: 'number',
    editable: false
  },
  {
    field: 'title',
    headerName: 'Titel',
    editable: true,
    resizable: true,
    width: 200,
    hide: type !== ReadingType.C_BOOK
  },
  {
    field: 'totalCap',
    headerName: 'TotalKap',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100
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
    width: 200
  },
  {
    field: 'theEnd',
    headerName: 'Ende',
    type: 'boolean',
    editable: true,
    resizable: true,
    width: 100
  },
  {
    field: 'referenceEnd',
    headerName: 'ReferenzEnde',
    width: 100,
    editable: true,
    maxWidth: 300,
    resizable: true
  }
];
