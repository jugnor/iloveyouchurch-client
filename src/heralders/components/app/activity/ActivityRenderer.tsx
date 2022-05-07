import * as React from 'react';
import {GridColumns, GridRowsProp,} from '@mui/x-data-grid';
import {randomId} from '@mui/x-data-grid-generator';

import {GridRenderCellParams} from "@mui/x-data-grid/models/params/gridCellParams";
import {ResultsObject} from "../../util/ResultsObject";
import {Activity, UpsertActivityRequestSchema} from "../../../models/Activity";
import {ActivityType} from "../../../models/ActivityType";


export const activityRowsRendererByType = (data: ResultsObject<Activity> | undefined, methode: string) => {

  let resultMap: readonly { [key: string]: any; }[] = []
  if (methode === "get" || methode === "" || methode === "createGet") {
    if (data !== undefined) {
      resultMap = data.items.map(x => ({
        id: randomId(),
        aId: x.id,
        postboxId: x.postboxId,
        activityType: x.activityType,
        description: x.description,
        activityOrder: x.activityOrder
      }));
    }
  } else if (methode === 'create') {
    return [{
      id: randomId(),
      description: '',
      activityOrder: ''
    }]
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertActivityFormData = (params: GridRenderCellParams, activityType: string) => {

  const activityOrder: string = "" + params.getValue(params.id, "activityOrder");
  const description: string = "" + params.getValue(params.id, "description");

  return {
    activityType: activityType,
    description: description,
    activityOrder: activityOrder

  }
}

export const validateActivity = (upsertActivity: {}): boolean => {

  console.log("fehler " + {CreateActivityRequestSchema: UpsertActivityRequestSchema})
  return upsertActivity !== undefined && !UpsertActivityRequestSchema.validate(upsertActivity).error
}

export const activityColumns = (activityType: string): GridColumns => [

  {
    field: 'days', headerName: 'Tag',
    editable: true, resizable: true, width: 150, hide: activityType !== ActivityType.PROGRAM
  },
  {
    field: 'description', headerName: 'Beschreibung',
    editable: true, resizable: true, width: 600,
  }];
