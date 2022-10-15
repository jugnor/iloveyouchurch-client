import * as React from 'react';
import { GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';

import { toDate } from 'date-fns';
import { ResultsObject } from '../../../models/ResultsObject';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams';
import {
  CreateGodGivingRequestSchema,
  GodGiving,
  GodGivingType,
  UpdateGodGivingRequestSchema
} from '../../../models/GodGiving';
import toNumber from '@mui/x-data-grid/lib/lodash/toNumber';



export const upsertGodGivingFormData = (
  postboxId: string,
  userId: string,
  start: string,
  end: string,
  create: boolean,
  params: GridRenderCellParams,
  disciplineType: string
) => {
  const godGivingType = disciplineType;
  const timeInMinute: number = toNumber(
    params.getValue(params.id, 'timeInMinute')
  );
  const amount: number = toNumber(params.getValue(params.id, 'amount'));
  const total: number = toNumber(params.getValue(params.id, 'total'));
  const description: string = '' + params.getValue(params.id, 'description');
  const presence: boolean = true;

  if (create) {
    return {
      userTime: {
        userId: userId,
        postboxId: postboxId,
        startWeek: start,
        endWeek: end,
        week: start + '/' + end
      },
      timeInMinute:
        disciplineType !== GodGivingType.THANKS ? null : timeInMinute,
      amount: disciplineType !== GodGivingType.MONEY ? null : amount,
      total: disciplineType !== GodGivingType.THANKS ? null : total,
      presence: disciplineType !== GodGivingType.CHORE ? null : presence,
      description: description,
      godGivingType: godGivingType
    };
  }
  return {
    timeInMinute: disciplineType !== GodGivingType.THANKS ? null : timeInMinute,
    amount: disciplineType !== GodGivingType.MONEY ? null : amount,
    total: disciplineType !== GodGivingType.THANKS ? null : total,
    presence: disciplineType !== GodGivingType.CHORE ? null : presence,
    description: description,
    godGivingType: godGivingType
  };
};

export const validateGodGiving = (
  upsertGodGiving: {},
  create: boolean
): boolean => {
  if (create) {
    console.log('fehler ' + { CreateGodGivingRequestSchema });
    return (
      upsertGodGiving !== undefined &&
      !CreateGodGivingRequestSchema.validate(upsertGodGiving).error
    );
  }
  return (
    upsertGodGiving !== undefined &&
    !UpdateGodGivingRequestSchema.validate(upsertGodGiving).error
  );
};

