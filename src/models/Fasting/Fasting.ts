import Joi, { Schema } from 'joi';
import { Except } from 'type-fest';
import {ResultsObject} from "../ResultsObject";
import {randomId} from "@mui/x-data-grid-generator";
import {toDate} from "date-fns";
import {GridColumns, GridRowsProp} from "@mui/x-data-grid";

export enum FastingType {
  COMPLETE = 'COMPLETE',
  PARTIAL = 'PARTIAL'
}

export interface Fasting {
  id: string;
  userId:string
  goal: string;
  days: number;
  fastingType: FastingType;
  weekOfYear: number;
  createdAt?: Date;
}

export type UpsertFastingRequest = Except<Fasting, 'id' | 'createdAt'>;

export const CreateFastingRequestSchema: Schema = Joi.object({
  fastingType: Joi.string()
    .valid(...Object.values(FastingType))
    .required(),
  days: Joi.number().positive().required(),
  goal: Joi.string().optional().allow(''),
  userTime: Joi.object().required()
});

export const UpdateFastingRequestSchema: Schema = Joi.object({
  fastingType: Joi.string()
    .valid(...Object.values(FastingType))
    .required(),
  days: Joi.number().positive().required(),
  goal: Joi.string().optional().allow('')
});

export const fastingRows = (
  data: ResultsObject<Fasting> | undefined
) => {
  let resultMap: readonly { [key: string]: any }[] = [];
    if (data !== undefined) {
      resultMap = data.items.map((x) => ({
        id: randomId(),
        oId: x.id,
        userId: x.userId,
        fastingType: x.fastingType,
        goal: x.goal,
        days: x.days,
        weekOfYear:x.weekOfYear
      }));
      console.log('result ' + resultMap);
    }

const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const fastingColumns = (): GridColumns => [
  {
    field: 'weekOfYear',
    headerName: 'Kalenderwoche',
    width: 300,
    editable: false
  },
  {
    field: 'days',
    headerName: 'Tage',
    type: 'number',
    editable: true,
    resizable: true,
    width: 200
  },
  {
    field: 'goal',
    headerName: 'Ziel',
    editable: true,
    resizable: true,
    width: 500
  }
];

