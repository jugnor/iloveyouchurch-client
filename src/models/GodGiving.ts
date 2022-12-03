import Joi, { any, Schema, when } from 'joi';
import { Except } from 'type-fest';
import { ResultsObject } from './ResultsObject';
import { randomId } from '@mui/x-data-grid-generator';
import { GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { MatchMutate } from '../swr';

export enum GodGivingType {
  CHORE = 'CHORE',
  MONEY = 'MONEY',
  THANKS = 'THANKS'
}
export interface GodGiving {
  id: string;
  userId: string;
  godGivingType: GodGivingType;
  amount: number;
  total: number;
  timeInMinute: number;
  timeInHour: number;
  description: string;
  presence: boolean;
  weekOfYear: number;
  createdAt: string;
}

export type UpsertGodGivingRequest = Except<
  GodGiving,
  'id' | 'createdAt' | 'userId'
>;

export const CreateGodGivingRequestSchema: Schema = Joi.object({
  godGivingType: Joi.string()
    .valid(...Object.values(GodGivingType))
    .required(),
  amount: Joi.alternatives().conditional('godGivingType', {
    is: GodGivingType.MONEY,
    then: Joi.number().positive().required(),
    otherwise: null
  }),
  total: Joi.alternatives().conditional('godGivingType', {
    is: GodGivingType.THANKS,
    then: Joi.number().positive().required(),
    otherwise: null
  }),
  timeInMinute: Joi.alternatives().conditional('godGivingType', {
    is: GodGivingType.THANKS,
    then: Joi.number().min(0).optional(),
    otherwise: null
  }),
  presence: Joi.alternatives().conditional('godGivingType', {
    is: GodGivingType.CHORE,
    then: Joi.boolean().optional().allow(false),
    otherwise: null
  }),
  description: Joi.string().optional().empty(''),
  userTime: Joi.object().required()
});

export const UpsertGodGivingRequestSchema: Schema = Joi.object({
  godGivingType: Joi.string()
    .valid(...Object.values(GodGivingType))
    .required(),
  amount: Joi.when('godGivingType', {
    is: GodGivingType.MONEY,
    then: Joi.number().positive().required(),
    otherwise: Joi.forbidden()
  }),
  total: Joi.when('godGivingType', {
    is: GodGivingType.MONEY,
    then: Joi.forbidden(),
    otherwise: Joi.number().positive().required()
  }),
  timeInMinute: Joi.when('godGivingType', {
    is: GodGivingType.MONEY,
    then: Joi.forbidden(),
    otherwise: Joi.number().positive().required()
  }),
  description: when('godGivingType', {
    is: GodGivingType.CHORE,
    then: Joi.string().optional(),
    otherwise: Joi.string().required()
  }),
  weekOfYear: Joi.number().positive().required()
});
export function instanceOfActivity(object?: any): object is GodGiving {
  if (!object) {
    return false;
  }
  return (
    'postboxId' in object &&
    'amount' in object &&
    'godGivingType' in object &&
    'userTime' in object
  );
}

export function isGodGivingValidationOk(
  upsertGodGivingRequest: UpsertGodGivingRequest
) {
  const amount = upsertGodGivingRequest.amount;
  const total = upsertGodGivingRequest.total;
  const min = upsertGodGivingRequest.timeInMinute;
  const description = upsertGodGivingRequest.description;
  const weekOfYear = upsertGodGivingRequest.weekOfYear;
  const godGivingType = upsertGodGivingRequest.godGivingType;
  let isOk = false;

  switch (godGivingType) {
    case GodGivingType.CHORE:
      isOk = amount === undefined && total > 0 && min >= 0;
      break;

    case GodGivingType.MONEY:
      isOk =
        amount >= 0 &&
        total === undefined &&
        min === undefined &&
        description !== undefined;
      break;

    case GodGivingType.THANKS:
      isOk =
        amount === undefined &&
        total > 0 &&
        min >= 0 &&
        description !== undefined;
  }

  return isOk && weekOfYear > 0;
}

export const godGivingRows = (data: ResultsObject<GodGiving> | undefined) => {
  let resultMap: readonly { [key: string]: any }[] = [];
  if (data !== undefined) {
    resultMap = data.items.map((x) => ({
      id: randomId(),
      oId: x.id,
      userId: x.userId,
      godGivingType: x.godGivingType,
      timeInHour: x.timeInHour,
      timeInMinute: x.timeInMinute,
      amount: x.amount,
      total: x.total,
      description: x.description,
      presence: x.presence,
      weekOfYear: x.weekOfYear
    }));
  }
  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const godGivingColumns = (type: string): GridColumns => [
  {
    field: 'weekOfYear',
    headerName: 'Kalenderwoche',
    width: 200,
    type: 'number',
    editable: false
  },
  {
    field: 'timeInMinute',
    headerName: 'Zeit(min)',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100,
    hide: type !== GodGivingType.THANKS
  },
  {
    field: 'amount',
    headerName: 'Betrag',
    type: 'number',
    editable: true,
    resizable: true,
    width: type !== GodGivingType.MONEY ? 200 : 100,
    hide: type !== GodGivingType.MONEY
  },
  {
    field: 'total',
    headerName: 'Total',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100,
    hide: type !== GodGivingType.THANKS
  },
  {
    field: 'presence',
    headerName: 'Teilnahme',
    type: 'boolean',
    editable: true,
    resizable: true,
    width: 100,
    hide: type !== GodGivingType.CHORE
  },
  {
    field: 'description',
    headerName: 'Beschreibung',
    editable: true,
    resizable: true,
    width: 700
  }
];
