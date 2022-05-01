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
import {
  CreateFastingRequestSchema,
  Fasting,
  UpdateFastingRequestSchema
} from "../../../../models/Fasting";


export const fastingRowsRendererByWeek = (data: ResultsObject<Fasting> | undefined, start: Date | null, methode: string) => {

  let resultMap: readonly { [key: string]: any; }[] = []
  if (methode === "get" + startWeekString(start) || methode === "" || methode === "createGet") {
    if (data !== undefined) {
      resultMap = data.items.map(x => ({
        id: randomId(),
        oId: x.id,
        postboxId: x.userTime.postboxId,
        userId: x.userTime.userId,
        fastingType: x.fastingType,
        goal: x.goal,
        days:x.days,
        startW: x.userTime.startWeek,
        week: "von " + toDate(Date.parse(x.userTime.startWeek)).toLocaleDateString() + " bis " + toDate(Date.parse(x.userTime.endWeek)).toLocaleDateString()
      }));
      console.log("result " + resultMap)
    }
  }
  if (methode === 'create') {
    return [{
      id: randomId(),
      goal: '',
      days: 0,
    }]
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertFastingFormData = (start: string, end: string, create: boolean, params: GridRenderCellParams, disciplineType: string) => {
  const oId = params.row.oId;
  const postboxId = params.row.postboxId;
  const fastingType = params.row.prayerType;
  const userId = params.row.userId;
  let days :number = params.value(params.id, "days");
  const goal:string =   params.value(params.id, "goal");
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
        days: days,
        goal: goal,
        fastingType: fastingType
      }
    }
    return {
      days: days,
      goal: goal,
      fastingType: fastingType
    }
  }
}

export const validateFasting = (upsertFasting: {}, create: boolean): boolean => {
  if (create) {
    return upsertFasting !== undefined && !CreateFastingRequestSchema.validate(upsertFasting).error
  }
  return upsertFasting !== undefined && !UpdateFastingRequestSchema.validate(upsertFasting).error
}

export const fastingColumns = (disciplineType: string): GridColumns => [
  {
    field: 'week',
    headerName: 'Woche',
    width: 220,
    editable: false,
  },
  {
    field: 'days', headerName: 'Tage', type: 'number',
    editable: true, resizable: true, width: 300,
  },
  {
    field: 'goal', headerName: 'Ziel',
    editable: true, resizable: true, width: 300,
  }];
