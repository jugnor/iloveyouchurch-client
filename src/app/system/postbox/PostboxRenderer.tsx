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
import {PostboxModel} from "../../../models/PostboxModel";
import {useUserProperties} from "../../../hooks/useUserProperties";

export const postboxRowsRenderer = (data: ResultsObject<PostboxModel> | undefined, methode: string) => {

  let resultMap: readonly { [key: string]: any; }[] = []
  if (methode === "get" || methode === "" || methode === "createGet") {
    if (data !== undefined) {
      resultMap = data.items.map(x => ({
        id: randomId(),
        oId:x.id,
        name:x.name,
        ownerId: x.ownerId,
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
      ownerId: '',
      postboxType: '',
      description:'',
    }]
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertPostboxFormData = (
                                      create: boolean, params: GridRenderCellParams) => {
  const name = "" + params.getValue(params.id, "name");
  const ownerId = "" + params.getValue(params.id, "ownerId");
  let postboxType=""+ params.getValue(params.id, "postboxType");
  const description = "" + params.getValue(params.id, "description");
  if (create) {
    return {
      name:name,
      ownerId: ownerId,
      postboxType: postboxType,
      description: description,
    }
  }
  return {
    name:name,
    ownerId: ownerId,
    postboxType: postboxType,
    description: description,
  }
}

export const validatePostbox = (upsertPostbox: {}, create: boolean): boolean => {
  if (create) {
    return upsertPostbox !== undefined && !CreateUserRequestSchema.validate(upsertPostbox).error
  }
  return upsertPostbox !== undefined && !UpdateUserRequestSchema.validate(upsertPostbox).error
}


const {isSystemAdmin} = useUserProperties();

export const postboxColumns = (): GridColumns => [
  {
    field: 'name',
    headerName: 'Name',
    width: 220,
    editable: true,
  },
  {
    field: 'ownerId', headerName: 'OwnerId',
    editable: isSystemAdmin, resizable: true, width: 200
  },
  {
    field: 'postboxType', headerName: 'type', type: 'number',
    editable: false, resizable: true, width: 100,
  },
  {
    field: 'description', headerName: 'Beschreibung',
    editable: true, resizable: true, width: 100,
  }];
