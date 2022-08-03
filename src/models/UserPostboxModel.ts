import Joi, {Schema} from 'joi';
import {UserRole} from "./UserModel";


export interface UserPostboxModel {
  id: string
  postboxId: string;
  userId: string;
  userRole: UserRole;
  createdAt: string;
}

export interface UpsertUserToPostboxRequest {
  postboxId: string;
  email: string;
  userRole:UserRole;
}

export interface UpdateUserToPostboxRequest {
  postboxId: string;
  userId: string;
  userRole:UserRole;
}

export const UpsertUserToPostboxRequestSchema: Schema = Joi.object({
  postboxId: Joi.string().required(),
  email: Joi.string().email({tlds: {allow: false}}).required(),
  userRole:Joi.string()
  .valid(...Object.values(UserRole))
  .required(),
});
export const UpdateUserRoleInPostboxRequestSchema: Schema = Joi.object({
  postboxId: Joi.string().required(),
  userId:Joi.string().required(),
  userRole:Joi.string()
  .valid(...Object.values(UserRole))
  .required(),
});
