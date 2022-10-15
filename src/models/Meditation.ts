import Joi, { Schema } from 'joi';
import { Except } from 'type-fest';
import { UserTime } from './UserTime';
import {ResultsObject} from "./ResultsObject";
import {randomId} from "@mui/x-data-grid-generator";
import {GridColumns, GridRowsProp} from "@mui/x-data-grid";

export enum RetreatType {
  MEDITATION = 'MEDITATION',
  RETREAT = 'RETREAT'
}

export interface Meditation {
  id: string;
  userId:string,
  timeInMinute: number;
  timeInHour: number;
  theme: string;
  verse: string;
  total: number;
  retreatType: RetreatType;
  weekOfYear: number;
  createdAt?: Date;
}

export type UpsertMeditationRequest = Except<Meditation, 'id' | 'createdAt'>;

export const CreateMeditationRequestSchema: Schema = Joi.object({
  retreatType: Joi.string()
    .valid(...Object.values(RetreatType))
    .required(),
  timeInMinute: Joi.number().min(0).required(),
  total: Joi.number().positive().required(),
  theme: Joi.string().optional().allow(''),
  verse: Joi.string().optional().allow(''),
  userTime: Joi.object().required()
});

export const UpdateMeditationRequestSchema: Schema = Joi.object({
  retreatType: Joi.string()
    .valid(...Object.values(RetreatType))
    .required(),
  timeInMinute: Joi.number().min(0).required(),
  total: Joi.number().positive().required(),
  theme: Joi.string().optional().allow(''),
  verse: Joi.string().optional().allow('')
});

export const meditationRows= (
  data: ResultsObject<Meditation> | undefined
) => {
  let resultMap: readonly { [key: string]: any }[] = [];
    if (data !== undefined) {
      resultMap = data.items.map((x) => ({
        id: randomId(),
        oId: x.id,
        userId: x.userId,
        retreatType: x.retreatType,
        timeInHour: x.timeInHour,
        timeInMinute: x.timeInMinute,
        verse: x.verse,
        total: x.total,
        theme: x.theme,
       weekOfYear:x.weekOfYear
      }));
    }
  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const meditationColumns = (): GridColumns => [
  {
    field: 'weekOfYear',
    headerName: 'Kalenderwoche',
    width: 200,
    type:"number",
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
    field: 'total',
    headerName: 'Total',
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
    field: 'verse',
    headerName: 'Verse',
    editable: true,
    resizable: true,
    width: 200
  }
];

