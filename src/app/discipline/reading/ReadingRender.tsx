import * as React from 'react';
import { GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';

import { toDate } from 'date-fns';
import {
  CreateReadingRequestSchema,
  Reading,
  ReadingType,
  UpsertReadingRequestSchema
} from '../../../models/Reading';
import { GodGiving } from '../../../models/GodGiving';
import { ResultsObject } from '../../../models/ResultsObject';
import toNumber from '@mui/x-data-grid/lib/lodash/toNumber';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams';

export interface Discipline {
  discipline: Partial<Reading | GodGiving>;
}

export const readingRowsRendererByWeek = (
  data: ResultsObject<Reading> | undefined,
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
        readingType: x.readingType,
        totalCap: x.totalCap,
        title: x.title,
        referenceEnd: x.referenceEnd,
        timeInMinute: x.timeInMinute,
        timeInHour: x.timeInHour,
        theEnd: x.theEnd,
        theme: x.theme
      }));
    }
  }
  if (methode === 'create') {
    return [
      {
        id: randomId(),
        totalCap: 0,
        title: '',
        referenceEnd: '',
        timeInMinute: 0,
        theEnd: false,
        theme: ''
      }
    ];
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertReadingFormData = (
  postboxId: string,
  userId: string,
  start: string,
  end: string,
  create: boolean,
  params: GridRenderCellParams,
  disciplineType: string
) => {
  const readingType = disciplineType;

  let totalCap = toNumber(params.getValue(params.id, 'totalCap'));
  const title = '' + params.getValue(params.id, 'title');
  let timeInMinute = toNumber(params.getValue(params.id, 'timeInMinute'));
  const referenceEnd = '' + params.getValue(params.id, 'referenceEnd');
  let theEnd: any = params.getValue(params.id, 'theEnd');
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
      totalCap: totalCap,
      title: disciplineType === ReadingType.C_BOOK ? title : null,
      referenceEnd: referenceEnd,
      timeInMinute: timeInMinute,
      theEnd: theEnd,
      theme: theme,
      readingType: readingType
    };
  }
  return {
    totalCap: totalCap,
    title: disciplineType === ReadingType.C_BOOK ? title : null,
    referenceEnd: referenceEnd,
    timeInMinute: timeInMinute,
    theEnd: theEnd,
    theme: theme,
    readingType: readingType
  };
};

export const validateReading = (
  upsertReading: {},
  create: boolean
): boolean => {
  if (create) {
    console.log(upsertReading);
    console.log(CreateReadingRequestSchema.validate(upsertReading).error);
    return (
      upsertReading !== undefined &&
      !CreateReadingRequestSchema.validate(upsertReading).error
    );
  }
  return (
    upsertReading !== undefined &&
    !UpsertReadingRequestSchema.validate(upsertReading).error
  );
};

export const readingColumns2 = (disciplineType: string): GridColumns => [
  {
    field: 'week',
    headerName: 'Woche',
    width: 220,
    editable: false
  },
  {
    field: 'title',
    headerName: 'Titel',
    editable: true,
    resizable: true,
    width: 200,
    hide: disciplineType !== ReadingType.C_BOOK
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
    width: 200,
    editable: true,
    maxWidth: 300,
    resizable: true
  }
];
