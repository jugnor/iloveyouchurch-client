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
import {
  CreateUserRequestSchema,
  UpdateUserRequestSchema,
  UserModel
} from "../../../models/UserModel";
import {
  CreatePostboxRequestSchema,
  PostboxModel,
  UpdatePostboxRequestSchema
} from "../../../models/PostboxModel";
import {useUserProperties} from "../../../hooks/useUserProperties";

export const postboxRowsRenderer = (data: ResultsObject<PostboxModel> | undefined, methode: string) => {

  let resultMap: readonly { [key: string]: any; }[] = []
  if (methode === "get" || methode === "" || methode === "createGet") {
    if (data !== undefined) {
      resultMap = data.items.map(x => ({
        id: randomId(),
        oId:x.id,
        name:x.name,
        postboxType: x.postboxType,
        description: x.description,
        createdAt:x.createdAt
      }));
    }
  }
  if (methode === 'create') {
    return [{
      id: randomId(),
      name:'',
      postboxType: '',
      description:'',
    }]
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertPostboxFormData = (
  params: GridRenderCellParams) => {
  const name = "" + params.getValue(params.id, "name");
  let postboxType=""+ params.getValue(params.id, "postboxType");
  const description = "" + params.getValue(params.id, "description");

    return {
      name:name,
      postboxType: postboxType,
      description: description,

  }

}

export const validatePostbox = (upsertPostbox: {}, create: boolean): boolean => {
  if (create) {
    return upsertPostbox !== undefined && !CreatePostboxRequestSchema.validate(upsertPostbox).error
  }
  console.log(upsertPostbox)

  console.log(UpdatePostboxRequestSchema.validate(upsertPostbox).error)
  return upsertPostbox !== undefined && !UpdatePostboxRequestSchema.validate(upsertPostbox).error
}


export const postboxColumns = (create :boolean): GridColumns => [
  {
    field: 'name',
    headerName: 'Name',
    width: 250,
    editable: create,
  },
  {
    field: 'postboxType', headerName: 'type',
    editable: create, resizable: true, width: 200,
  },
  {
    field: 'description', headerName: 'Beschreibung',
    editable: true, resizable: true, width: 300,
  }];
