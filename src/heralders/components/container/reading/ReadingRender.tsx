import * as React from 'react';
import {GridColumns, GridRowsProp,} from '@mui/x-data-grid';
import {randomId,} from '@mui/x-data-grid-generator';
import {ResultsObject} from "../../util/ResultsObject";
import {toDate} from "date-fns";
import {startWeekString} from "../TaskRender";
import clsx from "clsx";
import {GridCellParams} from "@mui/x-data-grid-pro";
import {BibleReading} from "../../../models/BibleReading";

export interface BibleClReading {
  reading: Partial<BibleReading>
}

export const ggRowsRendererByWeek = (data: ResultsObject<BibleClReading> | undefined, start: Date | null, methode: string) => {

  let resultMap: readonly { [key: string]: any; }[] = []
  if (methode === "get" + startWeekString(start) || methode === "" || methode === "createGet") {
    if (data !== undefined) {
      resultMap = data.items.map(x => ({
        id: randomId(),
        ggId: x.id,
        amount: x.amount,
        type: x.type,
        startW: x.userTime.startWeek,
        week: "von " + toDate(Date.parse(x.userTime.startWeek)).toLocaleDateString() + " bis " + toDate(Date.parse(x.userTime.endWeek)).toLocaleDateString()
      }));
      console.log("result " + resultMap)
    }
  }
  if (methode === 'create') {
    return [{
      id: randomId(),
      amount: 0,
      type: '',
    }]
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertGodGivingFormData = (start: string, end: string, amountValue: number, typeValue: string,
                                        postboxId: string, userId: string, create: boolean) => {
  if (create) {
    return {
      godGiving: {
        userTime: {
          userId: userId,
          postboxId: postboxId,
          startWeek: start,
          endWeek: end,
          week: start + "/" + end
        },
        amount: amountValue <= 0 ? '' : amountValue,
        type: typeValue
      }
    }

  }
  return {
    godGiving: {
      amount: amountValue <= 0 ? '' : amountValue,
      type: typeValue
    }
  }
}

export const ggColumns: GridColumns = [
  {
    field: 'week',
    headerName: 'Woche',
    width: 220,
    editable: false,
  },
  {
    field: 'amount', headerName: 'Betrag', type: 'number',
    width: 80, cellClassName: (params: GridCellParams<number>) =>
      clsx('super-app.positive', {
        positive: params.value > 0
      }), editable: true, resizable: true, maxWidth: 300
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 200,
    editable: true,
    maxWidth: 300,
    resizable: true,
  }];
