import * as React from 'react';
import {GridColumns, GridRowsProp,} from '@mui/x-data-grid';
import {randomId} from '@mui/x-data-grid-generator';

import {toDate} from "date-fns";
import {startWeekString} from "../../TimeHandlingRender";
import {ResultsObject} from "../../../util/ResultsObject";
import {GridRenderCellParams} from "@mui/x-data-grid/models/params/gridCellParams";
import {
  CreateGospelRequestSchema,
  Gospel,
  GospelType,
  UpdateGospelRequestSchema
} from "../../../../models/Gospel";


export const gospelRowsRendererByWeek = (data: ResultsObject<Gospel> | undefined, start: Date | null, methode: string) => {

  let resultMap: readonly { [key: string]: any; }[] = []
  if (methode === "get" + startWeekString(start) || methode === "" || methode === "createGet") {
    if (data !== undefined) {
      resultMap = data.items.map(x => ({
        id: randomId(),
        oId: x.id,
        postboxId: x.userTime.postboxId,
        userId: x.userTime.userId,
        gospelType: x.gospelType,
        timeInHour: x.timeInHour,
        timeInMinute: x.timeInMinute,
        goal: x.goal,
        total: x.total,
        name: x.gospelContact !== undefined ? x.gospelContact.name : null,
        email: x.gospelContact !== undefined ? x.gospelContact.email : null,
        telephone: x.gospelContact !== undefined ? x.gospelContact.telephone : null,
        city: x.gospelContact !== undefined ? x.gospelContact.city : null,
        title: x.gospelSupport !== undefined ? x.gospelSupport.title : null,
        supportType: x.gospelSupport !== undefined ? x.gospelSupport.supportType : null,
        startW: x.userTime.startWeek,
        week: "von " + toDate(Date.parse(x.userTime.startWeek)).toLocaleDateString() + " bis " + toDate(Date.parse(x.userTime.endWeek)).toLocaleDateString()
      }));
      console.log("result " + resultMap)
    }
  }
  if (methode === 'create') {
    return [{
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
    }]
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertGospelFormData = (start: string, end: string, create: boolean, params: GridRenderCellParams, disciplineType: string) => {
  const oId = params.row.oId;
  const postboxId = params.row.postboxId;
  const prayerType = params.row.prayerType;
  const userId = params.row.userId;
  let timeInMinute: number = params.value(params.id, "total");
  let goal: string = params.value(params.id, "goal");
  let total: number = params.value(params.id, "total");
  let name: string = params.value(params.id, "name");
  let email: string = params.value(params.id, "email");
  let telephone: string = params.value(params.id, "telephone");
  let city: string = params.value(params.id, "city");
  let title: string = params.value(params.id, "title");
  let supportType: string = params.value(params.id, "supportType");
  if (oId === undefined || oId === '') {
    if (create) {
      return {
        userTime: {
          userId: userId,
          postboxId: postboxId,
          startWeek: start,
          endWeek: end,
          week: start + "/" + end
        },
        timeInMinute: disciplineType === GospelType.GOSPEL ? timeInMinute : null,
        goal: disciplineType === GospelType.GOSPEL ? goal : null,
        total: disciplineType === GospelType.GOSPEL || GospelType.SUPPORT ? total : null,
        name: disciplineType === GospelType.CONTACT ? name : null,
        email: disciplineType === GospelType.CONTACT ? email : null,
        telephone: disciplineType === GospelType.CONTACT ? telephone : null,
        city: disciplineType === GospelType.CONTACT ? city : null,
        title: disciplineType === GospelType.SUPPORT ? title : null,
        supportType: disciplineType === GospelType.SUPPORT ? supportType : null,
        prayerType: prayerType
      }
    }
    return {
      timeInMinute: disciplineType === GospelType.GOSPEL ? timeInMinute : null,
      goal: disciplineType === GospelType.GOSPEL ? goal : null,
      total: disciplineType === GospelType.GOSPEL || GospelType.SUPPORT ? total : null,
      name: disciplineType === GospelType.CONTACT ? name : null,
      email: disciplineType === GospelType.CONTACT ? email : null,
      telephone: disciplineType === GospelType.CONTACT ? telephone : null,
      city: disciplineType === GospelType.CONTACT ? city : null,
      title: disciplineType === GospelType.SUPPORT ? title : null,
      supportType: disciplineType === GospelType.SUPPORT ? supportType : null,
      prayerType: prayerType
    }
  }
}

export const validateGospel = (upsertPrayer: {}, create: boolean): boolean => {
  if (create) {
    return upsertPrayer !== undefined && !CreateGospelRequestSchema.validate(upsertPrayer).error
  }
  return upsertPrayer !== undefined && !UpdateGospelRequestSchema.validate(upsertPrayer).error
}

export const gospelColumns = (disciplineType: string): GridColumns => [
  {
    field: 'week',
    headerName: 'Woche',
    width: 220,
    editable: false,
  },
  {
    field: 'timeInMinute', headerName: 'Zeit(min)', type: 'number',
    editable: true, resizable: true, width: 300, hide: disciplineType === GospelType.GOSPEL
  },
  {
    field: 'total',
    headerName: 'Total',
    type: 'number',
    editable: true,
    resizable: true,
    width: 300,
    hide: disciplineType === GospelType.GOSPEL || disciplineType === GospelType.SUPPORT
  },
  {
    field: 'goal', headerName: 'Ziel',
    editable: true, resizable: true, width: 300, hide: disciplineType === GospelType.GOSPEL
  },
  {
    field: 'name', headerName: 'Name',
    editable: true, resizable: true, width: 300, hide: disciplineType === GospelType.CONTACT
  },
  {
    field: 'email', headerName: 'Email',
    editable: true, resizable: true, width: 300, hide: disciplineType === GospelType.CONTACT
  },
  {
    field: 'telephone', headerName: 'Telephone',
    editable: true, resizable: true, width: 300, hide: disciplineType === GospelType.CONTACT
  },
  {
    field: 'city', headerName: 'Stadt',
    editable: true, resizable: true, width: 300, hide: disciplineType === GospelType.CONTACT
  },
  {
    field: 'title', headerName: 'Titel',
    editable: true, resizable: true, width: 300, hide: disciplineType === GospelType.SUPPORT
  },
  {
    field: 'supportType', headerName: 'SupportType',
    editable: true, resizable: true, width: 300, hide: disciplineType === GospelType.SUPPORT
  }];
