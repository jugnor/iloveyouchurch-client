import * as React from 'react';
import { GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';

import { toDate } from 'date-fns';
import {
  CreateReadingRequestSchema,
  Reading,
  ReadingType,
  UpdateReadingRequestSchema
} from '../../../models/Reading';
import { GodGiving } from '../../../models/GodGiving';
import { ResultsObject } from '../../../models/ResultsObject';
import toNumber from '@mui/x-data-grid/lib/lodash/toNumber';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams';
import {
  CreateUserRequestSchema,
  UpdateUserRequestSchema,
  UserModel,
  UserRole
} from '../../../models/UserModel';
import {
  UpsertUserToPostboxRequestSchema,
  UpdateUserRoleInPostboxRequestSchema
} from '../../../models/UserPostboxModel';

export const userPostboxRowsRenderer = (
  data: ResultsObject<UserModel> | undefined,
  methode: string
) => {
  let resultMap: readonly { [key: string]: any }[] = [];
  if (methode === 'get' || methode === '' || methode === 'createGet') {
    if (data !== undefined) {
      resultMap = data.items.map((x) => ({
        id: randomId(),
        oId: x.id,
        username: x.username,
        firstName: x.firstName,
        lastName: x.lastName,
        email: x.email,
        userRole: x.userRole
      }));
    }
  }
  if (methode === 'create') {
    return [
      {
        id: randomId(),
        email: ''
      }
    ];
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertUserToPostboxFormData = (
  postboxId: string,
  params: GridRenderCellParams
) => {
  const email = '' + params.getValue(params.id, 'email');
  const userRole = '' + params.getValue(params.id, 'userRole');

  return {
    email: email,
    postboxId: postboxId,
    userRole: userRole as UserRole
  };
};

export const validateUpsertUserToPostbox =
  (upsertUserToPostbox: {}): boolean => {
    console.log(upsertUserToPostbox);
    console.log(
      UpsertUserToPostboxRequestSchema.validate(upsertUserToPostbox).error
    );
    return (
      upsertUserToPostbox !== undefined &&
      !UpsertUserToPostboxRequestSchema.validate(upsertUserToPostbox).error
    );
  };

export const userPostboxColumns = (create: boolean): GridColumns => [
  {
    field: 'username',
    headerName: 'username',
    width: 220,
    editable: false,
    hide: create
  },
  {
    field: 'email',
    headerName: 'Email',
    editable: true,
    resizable: true,
    width: 200
  },
  {
    field: 'userRole',
    headerName: 'Rolle',
    editable: true,
    resizable: true,
    width: 200
  },
  {
    field: 'firstName',
    headerName: 'Vorname',
    editable: false,
    resizable: true,
    width: 200,
    hide: create
  },
  {
    field: 'lastName',
    headerName: 'Nachname',
    editable: false,
    resizable: true,
    width: 200,
    hide: create
  }
];
