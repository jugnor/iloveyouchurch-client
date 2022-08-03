import Joi, {Schema} from "joi";
import {Except} from "type-fest";
import {PostboxModel} from "./PostboxModel";

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

export type CreateFileRequest = Except<FileModel, 'id' | 'createdAt'|'digest'|'postboxId'>;
export type UpdateFileRequest = Except<CreateFileRequest, 'size' | 'payload'|'mimeType'>;


export const UpdateFileRequestSchema: Schema = Joi.object({
  filename: Joi.string().required(),
  description: Joi.string().optional().allow(""),

});


export const CreateFileRequestSchema: Schema = Joi.object({
  filename: Joi.string().required(),
  description: Joi.string().required(),
  payload: Joi.string().required(),
  mimeType: Joi.string().required(),
  size: Joi.number().required(),


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

