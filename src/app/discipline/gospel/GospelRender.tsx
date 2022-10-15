import * as React from 'react';
import { GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';

import { toDate } from 'date-fns';
import { ResultsObject } from '../../../models/ResultsObject';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams';
import {
  CreateGospelRequestSchema,
  Gospel,
  GospelType,
  UpdateGospelRequestSchema
} from '../../../models/Gospel';
import toNumber from '@mui/x-data-grid/lib/lodash/toNumber';

export const gospelRowsRendererByWeek = (
  data: ResultsObject<Gospel> | undefined,
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

        gospelType: x.gospelType,
        timeInHour: x.timeInHour,
        timeInMinute: x.timeInMinute,
        goal: x.goal,
        total: x.total,
        name: x.gospelContact !== undefined ? x.gospelContact.name : null,
        email: x.gospelContact !== undefined ? x.gospelContact.email : null,
        telephone:
          x.gospelContact !== undefined ? x.gospelContact.telephone : null,
        city: x.gospelContact !== undefined ? x.gospelContact.city : null,
        title: x.gospelSupport !== undefined ? x.gospelSupport.title : null,
        supportType:
          x.gospelSupport !== undefined ? x.gospelSupport.supportType : null,

      }));
      console.log('result ' + resultMap);
    }
  }
  if (methode === 'create') {
    return [
      {
        id: randomId(),
        timeInMinute: 0,
        goal: '',
        total: 0,
        name: '',
        email: '',
        telephone: '',
        city: '',
        title: '',
        supportType: ''
      }
    ];
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertGospelFormData = (
  postboxId: string,
  userId: string,
  start: string,
  end: string,
  create: boolean,
  params: GridRenderCellParams,
  disciplineType: string
) => {
  const gospelType = disciplineType;
  let timeInMinute: number = toNumber(
    params.getValue(params.id, 'timeInMinute')
  );
  let goal: string = '' + params.getValue(params.id, 'goal');
  let total: number = toNumber(params.getValue(params.id, 'total'));
  let name: string = '' + params.getValue(params.id, 'name');
  let email: string = '' + params.getValue(params.id, 'email');
  let telephone: string = '' + params.getValue(params.id, 'telephone');
  let city: string = '' + params.getValue(params.id, 'city');
  let title: string = '' + params.getValue(params.id, 'title');
  let supportType: string = '' + params.getValue(params.id, 'supportType');
  if (create) {
    return {
      userTime: {
        userId: userId,
        postboxId: postboxId,
        startWeek: start,
        endWeek: end,
        week: start + '/' + end
      },
      timeInMinute: disciplineType === GospelType.GOSPEL ? timeInMinute : null,
      goal: disciplineType === GospelType.GOSPEL ? goal : null,
      total:
        disciplineType === GospelType.GOSPEL ||
        disciplineType === GospelType.SUPPORT
          ? total
          : null,
      gospelContact:
        disciplineType === GospelType.CONTACT
          ? {
              name: name,
              email: email,
              telephone: telephone,
              city: city
            }
          : null,
      gospelSupport:
        disciplineType === GospelType.SUPPORT
          ? {
              title: title,
              supportType: supportType
            }
          : null,
      gospelType: gospelType
    };
  }
  return {
    timeInMinute: disciplineType === GospelType.GOSPEL ? timeInMinute : null,
    goal: disciplineType === GospelType.GOSPEL ? goal : null,
    total:
      disciplineType === GospelType.GOSPEL ||
      disciplineType === GospelType.SUPPORT
        ? total
        : null,
    gospelContact:
      disciplineType === GospelType.CONTACT
        ? {
            name: name,
            email: email,
            telephone: telephone,
            city: city
          }
        : null,
    gospelSupport:
      disciplineType === GospelType.SUPPORT
        ? {
            title: title,
            supportType: supportType
          }
        : null,
    gospelType: gospelType
  };
};

export const validateGospel = (upsertGospel: {}, create: boolean): boolean => {
  if (create) {
    console.log(upsertGospel);
    console.log(CreateGospelRequestSchema.validate(upsertGospel).error);
    return (
      upsertGospel !== undefined &&
      !CreateGospelRequestSchema.validate(upsertGospel).error
    );
  }
  return (
    upsertGospel !== undefined &&
    !UpdateGospelRequestSchema.validate(upsertGospel).error
  );
};

export const gospelCol = (type: string): GridColumns => [
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
    width: 100,
    hide: type !== GospelType.GOSPEL
  },
  {
    field: 'total',
    headerName: 'Total',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100,
    hide:
      type !== GospelType.GOSPEL &&
      type !== GospelType.SUPPORT
  },
  {
    field: 'goal',
    headerName: 'Ziel',
    editable: true,
    resizable: true,
    width: 500,
    hide: type !== GospelType.GOSPEL
  },
  {
    field: 'name',
    headerName: 'Name',
    editable: true,
    resizable: true,
    width: 200,
    hide: type !== GospelType.CONTACT
  },
  {
    field: 'email',
    headerName: 'Email',
    editable: true,
    resizable: true,
    width: 200,
    hide: type !== GospelType.CONTACT
  },
  {
    field: 'telephone',
    headerName: 'Telephone',
    editable: true,
    resizable: true,
    width: 100,
    hide: type !== GospelType.CONTACT
  },
  {
    field: 'city',
    headerName: 'Stadt',
    editable: true,
    resizable: true,
    width: 100,
    hide: type !== GospelType.CONTACT
  },
  {
    field: 'title',
    headerName: 'Titel',
    editable: true,
    resizable: true,
    width: 200,
    hide: type !== GospelType.SUPPORT
  },
  {
    field: 'supportType',
    headerName: 'SupportType',
    editable: true,
    resizable: true,
    width: 150,
    hide: type !== GospelType.SUPPORT
  }
];
