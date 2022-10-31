import * as React from 'react';
import { GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';

import { toDate } from 'date-fns';
import {
  CreateReadingRequestSchema,
  Reading,
  ReadingType,
  UpsertReadingRequestSchema
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
