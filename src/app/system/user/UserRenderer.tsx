import * as React from 'react';
import {GridColumns, GridRowsProp,} from '@mui/x-data-grid';
import {randomId} from '@mui/x-data-grid-generator';

import {toDate} from "date-fns";
import {
  CreateReadingRequestSchema,
  Reading,
  ReadingType,
  UpdateReadingRequestSchema
} from "../../../models/Reading";
import {GodGiving} from "../../../models/GodGiving";
import {ResultsObject} from "../../../models/ResultsObject";
import toNumber from "@mui/x-data-grid/lib/lodash/toNumber";
import {GridRenderCellParams} from "@mui/x-data-grid/models/params/gridCellParams";
import {CreateUserRequestSchema, UpdateUserRequestSchema} from "../../../models/UserModel";

export const userRowsRenderer = (data: ResultsObject<Reading> | undefined, methode: string) => {

  let resultMap: readonly { [key: string]: any; }[] = []
  if (methode === "get" || methode === "" || methode === "createGet") {
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

export const upsertReadingFormData = (postboxId: string, userId: string, start: string, end: string,
                                      create: boolean, params: GridRenderCellParams, disciplineType: string) => {

  const readingType = disciplineType;

  let totalCap = toNumber(params.getValue(params.id, "totalCap"));
  const title = "" + params.getValue(params.id, "title");
  let timeInMinute = toNumber(params.getValue(params.id, "timeInMinute"));
  const referenceEnd = "" + params.getValue(params.id, "referenceEnd");
  let theEnd: any = params.getValue(params.id, "theEnd");
  const theme = "" + params.getValue(params.id, "theme");
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
      title: disciplineType===ReadingType.C_BOOK?title:null,
      referenceEnd: referenceEnd,
      timeInMinute: timeInMinute,
      theEnd: theEnd,
      theme: theme,
      readingType: readingType
    }
  }
  return {
    totalCap: totalCap,
    title: disciplineType===ReadingType.C_BOOK?title:null,
    referenceEnd: referenceEnd,
    timeInMinute: timeInMinute,
    theEnd: theEnd,
    theme: theme,
    readingType: readingType
  }
}

export const validateUser = (upsertUser: {}, create: boolean): boolean => {
  if (create) {
    console.log(upsertUser)
    console.log(CreateUserRequestSchema.validate(upsertUser).error)
    return upsertUser !== undefined && !CreateUserRequestSchema.validate(upsertUser).error
  }
  return upsertUser !== undefined && !UpdateUserRequestSchema.validate(upsertUser).error
}

export const userColumns = (): GridColumns => [
  {
    field: 'username',
    headerName: 'username',
    width: 220,
    editable: true,
  },
  {
    field: 'email', headerName: 'Email',
    editable: true, resizable: true, width: 200
  },
  {
    field: 'firstName', headerName: 'Vorname', type: 'number',
    editable: true, resizable: true, width: 100,
  },
  {
    field: 'lastName', headerName: 'Nachname',
    editable: true, resizable: true, width: 100,
  }];
