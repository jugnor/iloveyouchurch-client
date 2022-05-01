import * as React from 'react';
import {GridColumns, GridRowsProp,} from '@mui/x-data-grid';
import {randomId} from '@mui/x-data-grid-generator';

import {toDate} from "date-fns";
import {startWeekString} from "../../TimeHandlingRender";
import {ResultsObject} from "../../../util/ResultsObject";
import toNumber from "@mui/x-data-grid/lib/lodash/toNumber";
import {GridRenderCellParams} from "@mui/x-data-grid/models/params/gridCellParams";
import {
  CreatePrayerRequestSchema,
  Prayer,
  PrayerType,
  UpdatePrayerRequestSchema
} from "../../../../models/Prayer";


export const prayerRowsRendererByWeek = (data: ResultsObject<Prayer> | undefined, start: Date | null, methode: string) => {

  let resultMap: readonly { [key: string]: any; }[] = []
  if (methode === "get" + startWeekString(start) || methode === "" || methode === "createGet") {
    if (data !== undefined) {
      resultMap = data.items.map(x => ({
        id: randomId(),
        oId: x.id,
        postboxId: x.userTime.postboxId,
        userId: x.userTime.userId,
        prayerType: x.prayerType,
        timeInHour: x.timeInHour,
        timeInMinute: x.timeInMinute,
        fridayPrayer: x.fridayPrayer,
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
      fridayPrayer: false,
      theme: '',
    }]
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertPrayerFormData = (start: string, end: string, create: boolean, params: GridRenderCellParams, disciplineType: string) => {
  const oId = params.row.oId;
  const postboxId = params.row.postboxId;
  const prayerType = params.row.prayerType;
  const userId = params.row.userId;
  let timeInMinute = toNumber(params.getValue(params.id, "timeInMinute"));
  let fridayPrayer: boolean = params.value(params.id, "fridayPrayer");
  const theme = "" + params.getValue(params.id, "theme");
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
        timeInMinute: timeInMinute,
        fridayPrayer: disciplineType == PrayerType.ALONE ? null : fridayPrayer,
        theme: theme,
        prayerType: prayerType
      }
    }
    return {
      timeInMinute: timeInMinute,
      fridayPrayer: disciplineType == PrayerType.ALONE ? null : fridayPrayer,
      theme: theme,
      prayerType: prayerType
    }
  }
}

export const validatePrayer = (upsertPrayer: {}, create: boolean): boolean => {
  if (create) {
    return upsertPrayer !== undefined && !CreatePrayerRequestSchema.validate(upsertPrayer).error
  }
  return upsertPrayer !== undefined && !UpdatePrayerRequestSchema.validate(upsertPrayer).error
}

export const prayerColumns = (disciplineType: string): GridColumns => [
  {
    field: 'week',
    headerName: 'Woche',
    width: 220,
    editable: false,
  },
  {
    field: 'timeInMinute', headerName: 'Zeit(min)', type: 'number',
    editable: true, resizable: true, width: 300,
  },
  {
    field: 'theme', headerName: 'Thema',
    editable: true, resizable: true, width: 300,
  },
  {
    field: 'prayerFriday', headerName: 'Gebet(Freitag)', type: 'boolean',
    editable: true, resizable: true, width: 300, hide: disciplineType != PrayerType.ALONE
  }];
