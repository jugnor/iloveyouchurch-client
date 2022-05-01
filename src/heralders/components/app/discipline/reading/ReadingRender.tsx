import * as React from 'react';
import {GridColumns, GridRowsProp,} from '@mui/x-data-grid';
import {randomId} from '@mui/x-data-grid-generator';

import {toDate} from "date-fns";
import {startWeekString} from "../../TimeHandlingRender";
import {
  CreateReadingRequestSchema,
  Reading,
  UpdateReadingRequestSchema
} from "../../../../models/Reading";
import {GodGiving} from "../../../../models/GodGiving";
import {ResultsObject} from "../../../util/ResultsObject";
import toNumber from "@mui/x-data-grid/lib/lodash/toNumber";
import {GridRenderCellParams} from "@mui/x-data-grid/models/params/gridCellParams";

export interface Discipline {
  discipline: Partial<Reading | GodGiving>
}

export const readingRowsRendererByWeek = (data: ResultsObject<Reading> | undefined, start: Date | null, methode: string) => {

  let resultMap: readonly { [key: string]: any; }[] = []
  if (methode === "get" + startWeekString(start) || methode === "" || methode === "createGet") {
    if (data !== undefined) {
      resultMap = data.items.map(x => ({
        id: randomId(),
        oId: x.id,
        postboxId: x.userTime.postboxId,
        userId: x.userTime.userId,
        readingType: x.readingType,
        totalCap: x.totalCap,
        title: x.title,
        referenceEnd: x.referenceEnd,
        timeInMinute: x.timeInMinute,
        timeInHour: x.timeInHour,
        theEnd: x.theEnd,
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
      totalCap: 0,
      title: '',
      referenceEnd: '',
      timeInMinute: 0,
      theEnd: false,
      theme: '',
    }]
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertReadingFormData = (start: string, end: string, create: boolean, params: GridRenderCellParams) => {
  const oId = params.row.oId;
  const postboxId = params.row.postboxId;
  const readingType = params.row.readingType;
  const userId = params.row.userId;
  let totalCap = toNumber(params.getValue(params.id, "totalCap"));
  const title = "" + params.getValue(params.id, "title");
  let timeInMinute = toNumber(params.getValue(params.id, "timeInMinute"));
  const referenceEnd = "" + params.getValue(params.id, "referenceEnd");
  let theEnd: boolean = params.value(params.id, "theEnd");
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
        totalCap: totalCap,
        title: title,
        referenceEnd: referenceEnd,
        timeInMinute: timeInMinute,
        theEnd: theEnd,
        theme: theme,
        readingType: readingType
      }
    }
    return {
      totalCap: totalCap,
      title: title,
      referenceEnd: referenceEnd,
      timeInMinute: timeInMinute,
      theEnd: theEnd,
      theme: theme,
      readingType: readingType
    }
  }
}

export const validateReading = (upsertReading: {}, create: boolean): boolean => {
  if (create) {
    return upsertReading !== undefined && !CreateReadingRequestSchema.validate(upsertReading).error
  }
  return upsertReading !== undefined && !UpdateReadingRequestSchema.validate(upsertReading).error
}

export const readingColumns: GridColumns = [
  {
    field: 'week',
    headerName: 'Woche',
    width: 220,
    editable: false,
  },
  {
    field: 'title', headerName: 'Titel',
    editable: true, resizable: true, width: 300,
  },
  {
    field: 'total', headerName: 'TotalKap', type: 'number',
    editable: true, resizable: true, width: 300,
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
    field: 'theEnd', headerName: 'Ende', type: 'boolean',
    editable: true, resizable: true, width: 300,
  },
  {
    field: 'referenceEnd',
    headerName: 'ReferenzEnde',
    width: 200,
    editable: true,
    maxWidth: 300,
    resizable: true,
  }];
