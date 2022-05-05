import * as React from 'react';
import {GridColumns, GridRowsProp,} from '@mui/x-data-grid';
import {randomId} from '@mui/x-data-grid-generator';

import {toDate} from "date-fns";
import {ResultsObject} from "../../../util/ResultsObject";
import toNumber from "@mui/x-data-grid/lib/lodash/toNumber";
import {GridRenderCellParams} from "@mui/x-data-grid/models/params/gridCellParams";
import {
  CreateMeditationRequestSchema,
  Meditation,
  UpdateMeditationRequestSchema
} from "../../../../models/Meditation";


export const meditationRowsRendererByWeek = (data: ResultsObject<Meditation> | undefined, startWeek: string, methode: string) => {

  let resultMap: readonly { [key: string]: any; }[] = []
  if (methode === "get" + startWeek || methode === "" || methode === "createGet") {
    if (data !== undefined) {
      resultMap = data.items.map(x => ({
        id: randomId(),
        oId: x.id,
        postboxId: x.userTime.postboxId,
        userId: x.userTime.userId,
        retreatType: x.retreatType,
        timeInHour: x.timeInHour,
        timeInMinute: x.timeInMinute,
        verse: x.verse,
        total: x.total,
        theme: x.theme,
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
      total: 0,
      verse: '',
      theme: '',
    }]
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertMeditationFormData = (postboxId: string, userId: string, start: string, end: string, create: boolean, params: GridRenderCellParams, disciplineType: string) => {


  const retreatType = disciplineType;

  let timeInMinute = toNumber(params.getValue(params.id, "timeInMinute"));
  let total = toNumber(params.getValue(params.id, "total"));
  const theme = "" + params.getValue(params.id, "theme");
  const verse = "" + params.getValue(params.id, "verse");

  if (create) {
    return {
      userTime: {
        userId: userId,
        postboxId: postboxId,
        startWeek: start,
        endWeek: end,
        week: start + "/" + end
      },
      timeInMinute: timeInMinute,
      verse: verse,
      total: total,
      theme: theme,
      retreatType: retreatType
    }
  }
  return {
    timeInMinute: timeInMinute,
    verse: verse,
    total: total,
    theme: theme,
    retreatType: retreatType
  }
}

export const validateMeditation = (upsertMeditation: {}, create: boolean): boolean => {
  if (create) {
    return upsertMeditation !== undefined && !CreateMeditationRequestSchema.validate(upsertMeditation).error
  }
  console.log(UpdateMeditationRequestSchema.validate(upsertMeditation).error)
  return upsertMeditation !== undefined && !UpdateMeditationRequestSchema.validate(upsertMeditation).error
}

export const meditationColumns = (disciplineType: string): GridColumns => [
  {
    field: 'week',
    headerName: 'Woche',
    width: 220,
    editable: false,
  },
  {
    field: 'timeInMinute', headerName: 'Zeit(min)', type: 'number',
    editable: true, resizable: true, width: 100,
  },

  {
    field: 'total', headerName: 'Total', type: 'number',
    editable: true, resizable: true, width: 100,
  },
  {
    field: 'theme', headerName: 'Thema',
    editable: true, resizable: true, width: 200,
  },
  {
    field: 'verse', headerName: 'Verse',
    editable: true, resizable: true, width: 100,
  }];
