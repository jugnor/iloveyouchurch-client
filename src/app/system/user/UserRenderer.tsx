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

export const userRowsRenderer = (
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
        email: x.email
      }));
    }
  }
  if (methode === 'create') {
    return [
      {
        id: randomId(),
        username: '',
        firstName: '',
        lastName: '',
        email: ''
      }
    ];
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertUserFormData = (
  create: boolean,
  params: GridRenderCellParams
) => {
  const firstName = '' + params.getValue(params.id, 'firstName');
  const lastName = '' + params.getValue(params.id, 'lastName');
  let username = '' + params.getValue(params.id, 'username');
  const email = '' + params.getValue(params.id, 'email');
  const credentials = [{ value: email, temporary: false }];
  const role = '' + params.getValue(params.id, 'role');
  const clientRoles = { ilc_client: [role as UserRole] };
  if (create) {
    return {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      enabled: true,
      emailVerified: true,
      credentials: credentials,
      clientRoles: clientRoles
    };
  }
  return {
    firstName: firstName,
    lastName: lastName,
    userName: username,
    email: email
  };
};

export const validateUser = (upsertUser: {}, create: boolean): boolean => {
  if (create) {
    console.log(CreateUserRequestSchema.validate(upsertUser).error);
    return (
      upsertUser !== undefined &&
      !CreateUserRequestSchema.validate(upsertUser).error
    );
  }
  return (
    upsertUser !== undefined &&
    !UpdateUserRequestSchema.validate(upsertUser).error
  );
};

export const userColumns = (): GridColumns => [
  {
    field: 'username',
    headerName: 'UserName',
    width: 250,
    editable: true
  },
  {
    field: 'email',
    headerName: 'Email',
    editable: true,
    resizable: true,
    width: 300
  },
  {
    field: 'firstName',
    headerName: 'Vorname',
    editable: true,
    resizable: true,
    width: 250
  },
  {
    field: 'lastName',
    headerName: 'Nachname',
    editable: true,
    resizable: true,
    width: 250
  }
];
