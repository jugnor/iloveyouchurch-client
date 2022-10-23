import Joi, { Schema } from 'joi';
import { Except } from 'type-fest';
import { PostboxModel } from './PostboxModel';
import { GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { ResultsObject } from './ResultsObject';
import { randomId } from '@mui/x-data-grid-generator';

export interface FileModel {
  id: string;
  filename: string;
  description: string;
  digest: string;
  payload: string;
  mimeType: string;
  size: number;
  postboxId: string;
  createdAt: string;
}

export type CreateFileRequest = Except<
  FileModel,
  'id' | 'createdAt' | 'digest' | 'postboxId'
>;
export type UpdateFileRequest = Except<
  CreateFileRequest,
  'size' | 'payload' | 'mimeType'
>;

export const UpdateFileRequestSchema: Schema = Joi.object({
  filename: Joi.string().required(),
  description: Joi.string().optional().allow('')
});

export const CreateFileRequestSchema: Schema = Joi.object({
  filename: Joi.string().required(),
  description: Joi.string().required(),
  payload: Joi.string().required(),
  mimeType: Joi.string().required(),
  size: Joi.number().required()
});

export function fileToByteArray(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target?.result);
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsDataURL(file);
  });
}

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

export const fileRows = (data: ResultsObject<FileModel> | undefined) => {
  let resultMap: readonly { [key: string]: any }[] = [];
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
  const allRows: GridRowsProp = resultMap;
  return allRows;
};
