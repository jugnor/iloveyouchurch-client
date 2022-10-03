import * as React from 'react';
import { GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';

import { toDate } from 'date-fns';
import { ResultsObject } from '../../../models/ResultsObject';
import toNumber from '@mui/x-data-grid/lib/lodash/toNumber';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams';
import {
  CreatePrayerRequestSchema,
  Prayer,
  PrayerType,
  UpdatePrayerRequestSchema
} from '../../../models/Prayer';

export const prayerRowsRendererByWeek = (
  data: ResultsObject<Prayer> | undefined,
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
        postboxId: x.userTime.postboxId,
        userId: x.userTime.userId,
        prayerType: x.prayerType,
        timeInHour: x.timeInHour,
        timeInMinute: x.timeInMinute,
        prayerNight: x.prayerNight,
        theme: x.theme,
        startW: x.userTime.startWeek,
        week:
          'von ' +
          toDate(Date.parse(x.userTime.startWeek)).toLocaleDateString() +
          ' bis ' +
          toDate(Date.parse(x.userTime.endWeek)).toLocaleDateString()
      }));
    }
  }
  if (methode === 'create') {
    return [
      {
        id: randomId(),
        timeInMinute: 0,
        prayerNight: 0,
        theme: ''
      }
    ];
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertPrayerFormData = (
  postboxId: string,
  userId: string,
  start: string,
  end: string,
  create: boolean,
  params: GridRenderCellParams,
  disciplineType: string
) => {
  const prayerType = disciplineType;

  let timeInMinute = toNumber(params.getValue(params.id, 'timeInMinute'));
  let prayerNight: any = params.getValue(params.id, 'prayerNight');
  const theme = '' + params.getValue(params.id, 'theme');

  if (create) {
    return {
      userTime: {
        userId: userId,
        postboxId: postboxId,
        startWeek: start,
        endWeek: end,
        week: start + '/' + end
      },
      timeInMinute: timeInMinute,
      prayerNight: disciplineType == PrayerType.ALONE ? null : prayerNight,
      theme: theme,
      prayerType: prayerType
    };
  }
  return {
    timeInMinute: timeInMinute,
    prayerNight: disciplineType == PrayerType.ALONE ? null : prayerNight,
    theme: theme,
    prayerType: prayerType
  };
};

export const validatePrayer = (upsertPrayer: {}, create: boolean): boolean => {
  if (create) {
    return (
      upsertPrayer !== undefined &&
      !CreatePrayerRequestSchema.validate(upsertPrayer).error
    );
  }
  return (
    upsertPrayer !== undefined &&
    !UpdatePrayerRequestSchema.validate(upsertPrayer).error
  );
};

export const prayerColumns = (disciplineType: string): GridColumns => [
  {
    field: 'week',
    headerName: 'Woche',
    width: 220,
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
    width: 300
  },
  {
    field: 'prayerNight',
    headerName: 'Gebetsnacht',
    type: 'number',
    editable: true,
    resizable: true,
    width: 150,
    hide: disciplineType == PrayerType.ALONE
  }
];
