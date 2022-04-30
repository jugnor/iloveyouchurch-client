import * as React from 'react';
import {GridColumns, GridRowsProp,} from '@mui/x-data-grid';
import {randomId} from '@mui/x-data-grid-generator';

import {toDate} from "date-fns";
import {startWeekString} from "../../../container/TaskRender";
import {ResultsObject} from "../../../util/ResultsObject";
import {GridRenderCellParams} from "@mui/x-data-grid/models/params/gridCellParams";
import {
  CreateGodGivingRequestSchema,
  GodGiving,
  GodGivingType,
  UpdateGodGivingRequestSchema
} from "../../../../models/GodGiving";


export const godGivingRowsRendererByWeek = (data: ResultsObject<GodGiving> | undefined, start: Date | null, methode: string) => {

  let resultMap: readonly { [key: string]: any; }[] = []
  if (methode === "get" + startWeekString(start) || methode === "" || methode === "createGet") {
    if (data !== undefined) {
      resultMap = data.items.map(x => ({
        id: randomId(),
        oId: x.id,
        postboxId: x.userTime.postboxId,
        userId: x.userTime.userId,
        godGivingType: x.godGivingType,
        timeInHour: x.timeInHour,
        timeInMinute: x.timeInMinute,
        amount: x.amount,
        total: x.total,
        description: x.description,
        presence: x.presence,
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
      amount: 0,
      total: 0,
      description: '',
      presence: false,
    }]
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertGodGivingFormData = (start: string, end: string, create: boolean, params: GridRenderCellParams, disciplineType: string) => {
  const oId = params.row.oId;
  const postboxId = params.row.postboxId;
  const godGivingType = params.row.godGivingType;
  const userId = params.row.userId;
  let timeInMinute: number = params.value(params.id, "timeInMinute");
  let amount: number = params.value(params.id, "amount");
  let total: number = params.value(params.id, "total");
  let description: number = params.value(params.id, "description");
  let presence: number = params.value(params.id, "presence");

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
        timeInMinute: disciplineType !== GodGivingType.THANKS ? null : timeInMinute,
        amount: disciplineType !== GodGivingType.MONEY ? null : amount,
        total: disciplineType !== GodGivingType.THANKS ? null : total,
        presence: disciplineType !== GodGivingType.CHORE ? null : presence,
        description: description,
        godGivingType: godGivingType
      }
    }
    return {
      timeInMinute: disciplineType !== GodGivingType.THANKS ? null : timeInMinute,
      amount: disciplineType !== GodGivingType.MONEY ? null : amount,
      total: disciplineType !== GodGivingType.THANKS ? null : total,
      presence: disciplineType !== GodGivingType.CHORE ? null : presence,
      description: description,
      godGivingType: godGivingType
    }
  }
}

export const validateGodGiving = (upsertGodGiving: {}, create: boolean): boolean => {
  if (create) {
    return upsertGodGiving !== undefined && !CreateGodGivingRequestSchema.validate(upsertGodGiving).error
  }
  return upsertGodGiving !== undefined && !UpdateGodGivingRequestSchema.validate(upsertGodGiving).error
}

export const godGivingColumns = (disciplineType: string): GridColumns => [
  {
    field: 'week',
    headerName: 'Woche',
    width: 220,
    editable: false,
  },
  {
    field: 'timeInMinute', headerName: 'Zeit(min)', type: 'number',
    editable: true, resizable: true, width: 300,hide:disciplineType!==GodGivingType.THANKS
  },
  {
    field: 'amount', headerName: 'Betrag', type: 'number',
    editable: true, resizable: true, width: 300,hide:disciplineType!==GodGivingType.MONEY
  },
  {
    field: 'total', headerName: 'Total', type: 'number',
    editable: true, resizable: true, width: 300,hide:disciplineType!==GodGivingType.THANKS
  },
  {
    field: 'presence', headerName: 'Teilnahme', type: 'boolean',
    editable: true, resizable: true, width: 300,hide:disciplineType!==GodGivingType.CHORE
  },
  {
    field: 'description', headerName: 'Beschreibung',
    editable: true, resizable: true, width: 300,
  }];
