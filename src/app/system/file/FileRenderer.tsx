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
import { FileModel, UpdateFileRequestSchema } from '../../../models/File';
import { useCallback } from 'react';

export const fileRowsRenderer = (
  data: ResultsObject<FileModel> | undefined,
  methode: string
) => {
  let resultMap: readonly { [key: string]: any }[] = [];
  if (methode === 'get' || methode === '' || methode === 'createGet') {
    if (data !== undefined) {
      resultMap = data.items.map((x) => ({
        id: randomId(),
        oId: x.id,
        filename: x.filename,
        mimeType: x.mimeType,
        description: x.description,
        size: x.size,
        createdAt: x.createdAt
      }));
    }
  }
  if (methode === 'create') {
    return [
      {
        id: randomId(),
        filename: ''
      }
    ];
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertFileFormData = (
  postboxId: string,
  params: GridRenderCellParams
) => {
  const filename = '' + params.getValue(params.id, 'filename');
  const description = '' + params.getValue(params.id, 'description');

  return {
    filename: filename,
    description: description
  };
};

export const validateUpsertFile = (upsertUserFile: {}): boolean => {
  return (
    upsertUserFile !== undefined &&
    !UpdateFileRequestSchema.validate(upsertUserFile).error
  );
};

export const fileColumns = (): GridColumns => [
  {
    field: 'filename',
    headerName: 'Filename',
    width: 220,
    editable: true
  },
  {
    field: 'description',
    headerName: 'Beschreibung',
    editable: true,
    resizable: true,
    width: 200
  },
  {
    field: 'mimeType',
    headerName: 'MimeType',
    editable: false,
    resizable: true,
    width: 200
  },
  {
    field: 'size',
    headerName: 'Länge',
    editable: false,
    resizable: true,
    width: 200
  },
  {
    field: 'createdAt',
    headerName: 'Erstellt_Am',
    editable: false,
    resizable: true,
    width: 200
  }
];
