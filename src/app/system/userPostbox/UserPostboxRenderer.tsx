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
import {AddUserToPostboxRequestSchema} from "../../../models/UserPostboxModel";

export const userPostboxRowsRenderer = (data: ResultsObject<UserModel> | undefined, methode: string) => {

  let resultMap: readonly { [key: string]: any; }[] = []
  if (methode === "get" || methode === "" || methode === "createGet") {
    if (data !== undefined) {
      resultMap = data.items.map(x => ({
        id: randomId(),
        userName:x.userName,
        firstName: x.firstName,
        lastName: x.lastName,
        email: x.email,
      }));
    }
  }
  if (methode === 'create') {
    return [{
      id: randomId(),
      email:''
    }]
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const addUserToPostboxFormData = (
                                      postboxId:string, params: GridRenderCellParams) => {
  const email = "" + params.getValue(params.id, "email");

    return {
      email:email,
      postboxId:postboxId
    }
  }

export const validateAddUserToPostbox = (addUserToPostbox: {}): boolean => {
    return addUserToPostbox !== undefined && !AddUserToPostboxRequestSchema.validate(addUserToPostbox).error
}

export const userPostboxColumns = (): GridColumns => [
  {
    field: 'username',
    headerName: 'username',
    width: 220,
    editable: false,
  },
  {
    field: 'email', headerName: 'Email',
    editable: true, resizable: true, width: 200
  },
  {
    field: 'firstName', headerName: 'Vorname', type: 'number',
    editable: false, resizable: true, width: 100,
  },
  {
    field: 'lastName', headerName: 'Nachname',
    editable: false, resizable: true, width: 100,
  }];
