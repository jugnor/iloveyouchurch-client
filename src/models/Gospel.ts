import Joi, { Schema } from 'joi';
import { Except } from 'type-fest';
import { UserTime } from './UserTime';
import { GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { ResultsObject } from './ResultsObject';
import { randomId } from '@mui/x-data-grid-generator';
import { toDate } from 'date-fns';

export enum GospelType {
  GOSPEL = 'GOSPEL',
  CONTACT = 'CONTACT',
  SUPPORT = 'SUPPORT'
}

export interface Gospel {
  id: string;
  userId: string;
  timeInMinute: number;
  timeInHour: number;
  goal: string;
  total: number;
  gospelContact: GospelContact;
  gospelSupport: GospelSupport;
  gospelType: GospelType;
  weekOfYear: number;
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

export type UpsertGospelRequest = Except<Gospel, 'id' | 'createdAt' | 'userId'>;

export const CreateGospelRequestSchema: Schema = Joi.object({
  gospelType: Joi.string()
    .valid(...Object.values(GospelType))
    .required(),
  timeInMinute: Joi.alternatives().conditional('gospelType', {
    is: GospelType.GOSPEL,
    then: Joi.number().min(0).optional(),
    otherwise: null
  }),
  total: Joi.alternatives()
    .conditional('gospelType', {
      is: GospelType.GOSPEL,
      then: Joi.number().positive().required()
    })
    .conditional('gospelType', {
      is: GospelType.SUPPORT,
      then: Joi.number().positive().required(),
      otherwise: null
    }),
  goal: Joi.alternatives().conditional('gospelType', {
    is: GospelType.GOSPEL,
    then: Joi.string().optional().allow(''),
    otherwise: null
  }),
  gospelContact: Joi.alternatives().conditional('gospelType', {
    is: GospelType.CONTACT,
    then: Joi.object({
      name: Joi.string().required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .optional()
        .allow(''),
      telephone: Joi.string().optional().allow(null, ''),
      city: Joi.string().optional().allow(null, '')
    }).required(),
    otherwise: null
  }),
  gospelSupport: Joi.alternatives().conditional('gospelType', {
    is: GospelType.SUPPORT,
    then: Joi.object({
      title: Joi.string().required(),
      supportType: Joi.string().required()
    }).required(),
    otherwise: null
  }),
  userTime: Joi.object().required()
});

export const UpsertGospelRequestSchema: Schema = Joi.object({
  gospelType: Joi.string()
    .valid(...Object.values(GospelType))
    .required(),
  timeInMinute: Joi.alternatives().conditional('gospelType', {
    is: GospelType.GOSPEL,
    then: Joi.number().min(0).optional(),
    otherwise: undefined
  }),
  total: Joi.alternatives()
    .conditional('gospelType', {
      is: GospelType.GOSPEL,
      then: Joi.number().positive().required()
    })
    .conditional('gospelType', {
      is: GospelType.SUPPORT,
      then: Joi.number().positive().required(),
      otherwise: undefined
    }),
  goal: Joi.alternatives().conditional('gospelType', {
    is: GospelType.GOSPEL,
    then: Joi.string().optional().allow(''),
    otherwise: undefined
  }),
  gospelContact: Joi.alternatives().conditional('gospelType', {
    is: GospelType.CONTACT,
    then: Joi.object({
      name: Joi.string().required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .optional()
        .allow(''),
      telephone: Joi.string().optional().allow(null, ''),
      city: Joi.string().optional().allow(null, '')
    }).required(),
    otherwise: undefined
  }),
  gospelSupport: Joi.alternatives().conditional('gospelType', {
    is: GospelType.SUPPORT,
    then: Joi.object({
      title: Joi.string().required(),
      supportType: Joi.string().required()
    }).required(),
    otherwise: undefined
  })
});

export const gospelColumns = (type: string): GridColumns => [
  {
    field: 'weekOfYear',
    headerName: 'kalenderwoche',
    width: 200,
    type: 'number',
    editable: false
  },
  {
    field: 'timeInMinute',
    headerName: 'Zeit(min)',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100,
    hide: type !== GospelType.GOSPEL
  },
  {
    field: 'total',
    headerName: 'Total',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100,
    hide: type !== GospelType.GOSPEL && type !== GospelType.SUPPORT
  },
  {
    field: 'goal',
    headerName: 'Ziel',
    editable: true,
    resizable: true,
    width: 500,
    hide: type !== GospelType.GOSPEL
  },
  {
    field: 'name',
    headerName: 'Name',
    editable: true,
    resizable: true,
    width: 250,
    hide: type !== GospelType.CONTACT
  },
  {
    field: 'email',
    headerName: 'Email',
    editable: true,
    resizable: true,
    width: 250,
    hide: type !== GospelType.CONTACT
  },
  {
    field: 'telephone',
    headerName: 'Telephone',
    editable: true,
    resizable: true,
    width: 200,
    hide: type !== GospelType.CONTACT
  },
  {
    field: 'city',
    headerName: 'Stadt',
    editable: true,
    resizable: true,
    width: 200,
    hide: type !== GospelType.CONTACT
  },
  {
    field: 'title',
    headerName: 'Titel',
    editable: true,
    resizable: true,
    width: 300,
    hide: type !== GospelType.SUPPORT
  },
  {
    field: 'supportType',
    headerName: 'SupportType',
    editable: true,
    resizable: true,
    width: 300,
    hide: type !== GospelType.SUPPORT
  }
];

export const gospelRows = (data: ResultsObject<Gospel> | undefined) => {
  let resultMap: readonly { [key: string]: any }[] = [];
  if (data !== undefined) {
    resultMap = data.items.map((x) => ({
      id: randomId(),
      oId: x.id,
      userId: x.userId,
      gospelType: x.gospelType,
      timeInHour: x.timeInHour,
      timeInMinute: x.timeInMinute,
      goal: x.goal,
      total: x.total,
      name: x.gospelContact !== undefined ? x.gospelContact.name : null,
      email: x.gospelContact !== undefined ? x.gospelContact.email : null,
      telephone:
        x.gospelContact !== undefined ? x.gospelContact.telephone : null,
      city: x.gospelContact !== undefined ? x.gospelContact.city : null,
      title: x.gospelSupport !== undefined ? x.gospelSupport.title : null,
      supportType:
        x.gospelSupport !== undefined ? x.gospelSupport.supportType : null,
      weekOfYear: x.weekOfYear
    }));
  }
  const allRows: GridRowsProp = resultMap;
  return allRows;
};
