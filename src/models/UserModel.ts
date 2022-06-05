import {Except} from 'type-fest';
import Joi, {Schema} from 'joi';


export interface Credentials {
  value: string,
  temporary: boolean
}

interface ClientRoles {
  ilc_client: string[]
}

export interface UserModel {
  id: string;
  userName: string;
  enable: boolean;
  emailVerified: boolean;
  email: string;
  firstName: string;
  lastName: number;
  credentials: Credentials[];
  clientRoles: ClientRoles;
  createdTimestamp: number
}

export type UpsertUserRequest = Except<UserModel, 'id' | 'createdTimestamp'>;


export const CreateUserRequestSchema: Schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userName: Joi.string().required(),
  email: Joi.string().email({tlds: {allow: false}}).required(),
  enable: Joi.boolean().optional().allow(true),
  emailVerified: Joi.boolean().optional().allow(true),
  credentials: Joi.array().has(Joi.object({
      values: Joi.string().optional().allow(''),
      temporary: Joi.string().optional().allow('')
    })
  ).optional().allow(null),
  clientRoles: Joi.object(Joi.object({
    ilc_client: Joi.array()
  })).optional().allow(null)
});

export const UpdateUserRequestSchema = CreateUserRequestSchema;
