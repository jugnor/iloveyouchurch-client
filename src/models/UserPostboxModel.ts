import Joi, {Schema} from 'joi';
import {UserRole} from "./UserModel";


export interface UserPostboxModel {
  id: string
  postboxId: string;
  userId: string;
  userRole: UserRole;
  createdAt: string;
}

export interface AddUserToPostboxRequest {
  postboxId: string;
  email: string;
}

export const AddUserToPostboxRequestSchema: Schema = Joi.object({
  postboxId: Joi.string().required(),
  email: Joi.string().email({tlds: {allow: false}}).required(),
});
