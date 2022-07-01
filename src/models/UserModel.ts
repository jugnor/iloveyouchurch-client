import {Except} from 'type-fest';
import Joi, {Schema} from 'joi';

export enum UserRole {
  SYSTEM_ADMIN='SYSTEM_ADMIN',
  ADMIN='ADMIN',
  MONITOR='MONITOR',
  PARTICIPANT='PARTICIPANT'
}
export interface Credentials {
  value?: string,
  temporary?: boolean
}

interface ClientRoles {
  ilc_client?: string[]
}

export interface UserModel {
  id: string;
  username: string;
  enable?: boolean;
  emailVerified?: boolean;
  email: string;
  firstName: string;
  lastName: string;
  credentials?: Credentials[];
  clientRoles?: ClientRoles;
  userRole?:UserRole,
  createdTimestamp?: number
}

export type UpsertUserRequest = Except<UserModel, 'id' | 'createdTimestamp'>;


export const CreateUserRequestSchema: Schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email({tlds: {allow: false}}).required(),
  enable: Joi.boolean().optional().allow(true),
  emailVerified: Joi.boolean().optional().allow(true),
  credentials: Joi.array().has(Joi.object({
      values: Joi.string().optional().allow(''),
      temporary: Joi.string().optional().allow('')
    })
  ).optional().allow(null),
  clientRoles: Joi.object({
    ilc_client: Joi.array()
  }).optional().allow(null)
});

export const UpdateUserRequestSchema = CreateUserRequestSchema;
