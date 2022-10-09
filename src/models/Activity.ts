import Joi, { Schema } from 'joi';
import { Except } from 'type-fest';
import { ActivityType } from './ActivityType';
import { GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { ResultsObject } from './ResultsObject';
import { randomId } from '@mui/x-data-grid-generator';

export interface Activity {
  id: string;
  description?: string;
  postboxId: string;
  activityOrder: string;
  activityType: ActivityType;
  createdAt?: string;
}

export type UpsertActivityRequest = Except<Activity, 'postboxId' | 'createdAt'>;

export const UpsertActivityRequestSchema: Schema = Joi.object({
  activityType: Joi.string()
    .valid(...Object.values(ActivityType))
    .required(),
  description: Joi.string().required(),
  activityOrder: Joi.alternatives().conditional('godGivingType', {
    is: ActivityType.PROGRAM,
    then: Joi.string().required(),
    otherwise: Joi.string().optional().allow('', null)
  })
});

export function instanceOfActivity(object?: any): object is Activity {
  if (!object) {
    return false;
  }
  return (
    'postboxId' in object &&
    'activityOrder' in object &&
    'description' in object &&
    'activityType' in object
  );
}

export function translateActivityType(activityType: ActivityType) {
  switch (activityType) {
    case ActivityType.ANNOUNCEMENT:
      return 'Ankündigung';
    case ActivityType.EVENT:
      return 'Event';
    case ActivityType.NEWS:
      return 'Information';
    case ActivityType.PENALTY:
      return 'Straffe';
    case ActivityType.PROGRAM:
      return 'Program';
  }
}

export const setActivityColumns = (activityType: string): GridColumns => [
  {
    field: 'activityOrder',
    headerName: 'Tag',
    editable: true,
    width: 250,
    hide: activityType !== ActivityType.PROGRAM
  },
  {
    field: 'description',
    headerName: 'Beschreibung',
    editable: true,
    width: activityType === ActivityType.PROGRAM?750:1000
  }
];

export const setActivityRows = (data: ResultsObject<Activity> | undefined) => {
  let resultMap: readonly { [key: string]: any }[] = [];

  if (data !== undefined) {
    resultMap = data.items.map((x) => ({
      id: randomId(),
      aId: x.id,
      postboxId: x.postboxId,
      activityType: x.activityType,
      description: x.description,
      activityOrder: x.activityOrder
    }));
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};
