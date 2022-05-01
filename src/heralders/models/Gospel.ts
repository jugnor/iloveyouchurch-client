import Joi, {Schema} from 'joi';
import {Except} from 'type-fest';
import {UserTime} from "./UserTime";

export enum GospelType {
  GOSPEL = 'GOSPEL',
  CONTACT = 'CONTACT',
  SUPPORT = 'SUPPORT'
}

export interface Gospel {
  id: string;
  timeInMinute: number;
  timeInHour: number;
  goal: string;
  total: number;
  gospelContact: GospelContact
  gospelSupport: GospelSupport
  gospelType: GospelType;
  userTime: UserTime;
  createdAt?: Date;
}

export interface GospelSupport {
  title: string;
  supportType: string;
}

export interface GospelContact {
  name: string;
  email: string;
  telephone: string;
  city: string;
}

export type UpsertGospelRequest = Except<Gospel, 'id' | 'createdAt'>;


export const CreateGospelRequestSchema: Schema = Joi.object({
  gospelType: Joi.string()
  .valid(...Object.values(GospelType))
  .required(),
  timeInMinute: Joi.alternatives().conditional('gospelType', {
    is: GospelType.GOSPEL,
    then: Joi.number().min(0).optional().allow(0)
  }),
  total: Joi.alternatives().conditional('gospelType', {
    is: GospelType.GOSPEL || GospelType.SUPPORT,
    then: Joi.number().min(0).required()
  }),
  goal: Joi.alternatives().conditional('gospelType', {
    is: GospelType.GOSPEL,
    then: Joi.string().optional().allow('')
  }),
  gospelContact: Joi.alternatives().conditional('gospelType', {
    is: GospelType.CONTACT,
    then: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email({tlds: {allow: false}}).optional().allow(''),
      telephone: Joi.string().optional().allow(null),
      city: Joi.string().optional().allow(null)
    }).required()
  }),
  gospelSupport: Joi.alternatives().conditional('gospelType', {
    is: GospelType.SUPPORT,
    then: Joi.object({
      title: Joi.string().required(),
      supportType: Joi.string().required()
    }).required()
  }),
  userTime: Joi.object().required()
});

export const UpdateGospelRequestSchema: Schema = Joi.object({
    gospelType: Joi.string()
    .valid(...Object.values(GospelType))
    .required(),
    timeInMinute: Joi.alternatives().conditional('gospelType', {
      is: GospelType.GOSPEL,
      then: Joi.number().min(0).optional().allow(0)
    }),
    total: Joi.alternatives().conditional('gospelType', {
      is: GospelType.GOSPEL || GospelType.SUPPORT,
      then: Joi.number().min(0).required()
    }),
    goal: Joi.alternatives().conditional('gospelType', {
      is: GospelType.GOSPEL,
      then: Joi.string().optional().allow('')
    }),
    gospelContact: Joi.alternatives().conditional('gospelType', {
      is: GospelType.CONTACT,
      then: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({tlds: {allow: false}}).optional().allow(''),
        telephone: Joi.string().optional().allow(null),
        city: Joi.string().optional().allow(null)
      }).required()
    }),
    gospelSupport: Joi.alternatives().conditional('gospelType', {
      is: GospelType.SUPPORT,
      then: Joi.object({
        title: Joi.string().required(),
        supportType: Joi.string().required()
      }).required()
    })
  }
)

