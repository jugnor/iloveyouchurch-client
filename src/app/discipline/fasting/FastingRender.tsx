import * as React from 'react';
import { GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';

import { toDate } from 'date-fns';
import { ResultsObject } from '../../../models/ResultsObject';
import toNumber from '@mui/x-data-grid/lib/lodash/toNumber';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams';
import {
  CreateFastingRequestSchema,
  Fasting,
  UpdateFastingRequestSchema
} from '../../../models/Fasting/Fasting';

export const fastingRowsRendererByWeek = (
  data: ResultsObject<Fasting> | undefined,
  startWeek: string,
  methode: string
) => {
  let resultMap: readonly { [key: string]: any }[] = [];
  if (
    methode === 'get' + startWeek ||
    methode === '' ||
    methode === 'createGet'
  ) {
    if (data !== undefined) {
      resultMap = data.items.map((x) => ({
        id: randomId(),
        oId: x.id,

        fastingType: x.fastingType,
        goal: x.goal,
        days: x.days
      }));
      console.log('result ' + resultMap);
    }
  }
  if (methode === 'create') {
    return [
      {
        id: randomId(),
        goal: '',
        days: 0
      }
    ];
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertFastingFormData = (
  postboxId: string,
  userId: string,
  start: string,
  end: string,
  create: boolean,
  params: GridRenderCellParams,
  disciplineType: string
) => {
  const fastingType = disciplineType;
  let days: number = toNumber(params.getValue(params.row.id, 'days'));
  const goal: string = '' + params.getValue(params.id, 'goal');
  if (create) {
    return {
      userTime: {
        userId: userId,
        postboxId: postboxId,
        startWeek: start,
        endWeek: end,
        week: start + '/' + end
      },
      days: days,
      goal: goal,
      fastingType: fastingType
    };
  }
  return {
    days: days,
    goal: goal,
    fastingType: fastingType
  };
};

export const validateFasting = (
  upsertFasting: {},
  create: boolean
): boolean => {
  if (create) {
    return (
      upsertFasting !== undefined &&
      !CreateFastingRequestSchema.validate(upsertFasting).error
    );
  }
  return (
    upsertFasting !== undefined &&
    !UpdateFastingRequestSchema.validate(upsertFasting).error
  );
};

export const fastingColumns2 = (disciplineType: string): GridColumns => [
  {
    field: 'week',
    headerName: 'Woche',
    width: 220,
    editable: false
  },
  {
    field: 'days',
    headerName: 'Tage',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100
  },
  {
    field: 'goal',
    headerName: 'Ziel',
    editable: true,
    resizable: true,
    width: 300
  }
];
