import Joi, { Schema } from 'joi';
import { Except } from 'type-fest';
import { GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { ResultsObject } from './ResultsObject';
import { randomId } from '@mui/x-data-grid-generator';

export interface Regulation {
  id: string;
  postboxId: string;
  prayerAlone: number;
  prayerInGroup: number;
  prayerNight: number;
  bibleReading: number;
  clReading: number;
  thanksGiving: number;
  godGiving: number;
  partialFasting: number;
  completeFasting: number;
  retreat: number;
  choreRepeat: number;
  meditation: number;
  gospel: number;
  gospelContact: number;
  gospelSupport: number;
  createdAt: string;
}

export type UpsertRegulationRequest = Except<
  Regulation,
  'id' | 'postboxId' | 'createdAt'
>;

export const UpsertRegulationRequestSchema: Schema = Joi.object({
  prayerAlone: Joi.number().min(0).required(),
  prayerInGroup: Joi.number().min(0).required(),
  prayerNight: Joi.number().min(0).required(),
  bibleReading: Joi.number().min(0).required(),
  clReading: Joi.number().min(0).required(),
  thanksGiving: Joi.number().min(0).required(),
  godGiving: Joi.number().min(0).required(),
  partialFasting: Joi.number().min(0).required(),
  completeFasting: Joi.number().min(0).required(),
  retreat: Joi.number().min(0).required(),
  choreRepeat: Joi.number().min(0).required(),
  meditation: Joi.number().min(0).required(),
  gospel: Joi.number().min(0).required(),
  gospelContact: Joi.number().min(0).required(),
  gospelSupport: Joi.number().min(0).required()
});

export function instanceOfRegulation(object?: any): object is Regulation {
  if (!object) {
    return false;
  }
  return 'postboxId' in object;
}

export const setRegulationColumns = (): GridColumns => [
  {
    field: 'createdAt',
    headerName: 'Erstellt am',
    editable: true,
    type: 'date',
    resizable: true,
    width: 100
  },
  {
    field: 'prayerAlone',
    headerName: 'Gebet-Allein',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100
  },
  {
    field: 'prayerInGroup',
    headerName: 'Gebet in Gruppe',
    type: 'number',
    editable: true,
    resizable: true,
    width: 150
  },
  {
    field: 'prayerNight',
    headerName: 'Gebetsnacht',
    type: 'number',
    editable: true,
    resizable: true,
    width: 150
  },
  {
    field: 'meditation',
    headerName: 'Meditation',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100
  },
  {
    field: 'bibleReading',
    headerName: 'Bibel-Lesen',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100
  },
  {
    field: 'thanksGiving',
    headerName: 'Danksagung',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100
  },
  {
    field: 'partialFasting',
    headerName: 'Teil-Fasten',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100
  },
  {
    field: 'completeFasting',
    headerName: 'Komplettes Fasten',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100
  },

  {
    field: 'choreRepeat',
    headerName: 'Probe',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100
  },
  {
    field: 'godGiving',
    headerName: 'Spende',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100
  },
  {
    field: 'gospel',
    headerName: 'Evangelisation',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100
  },

  {
    field: 'gospelContact',
    headerName: 'Kontakte',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100
  },

  {
    field: 'gospelSupport',
    headerName: 'Support',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100
  },

  {
    field: 'godGiving',
    headerName: 'godGiving',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100
  },
  {
    field: 'retreat',
    headerName: 'Auszeit',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100
  },
  {
    field: 'christianLiteratureReading',
    headerName: 'Buch-Lesen',
    type: 'number',
    editable: true,
    resizable: true,
    width: 100
  }
];

export const setRegulationRows = (
  data: ResultsObject<Regulation> | undefined
) => {
  let resultMap: readonly { [key: string]: any }[] = [];
  if (data !== undefined) {
    resultMap = data.items.map((x) => ({
      id: randomId(),
      oId: x.id,
      postboxId: x.postboxId,
      prayerAlone: x.prayerAlone,
      prayerInGroup: x.prayerInGroup,
      prayerNight: x.prayerNight,
      bibleReading: x.bibleReading,
      clReading: x.clReading,
      thanksGiving: x.thanksGiving,
      godGiving: x.godGiving,
      partialFasting: x.partialFasting,
      completeFasting: x.completeFasting,
      retreat: x.retreat,
      choreRepeat: x.choreRepeat,
      meditation: x.meditation,
      gospel: x.gospel,
      gospelContact: x.gospelContact,
      gospelSupport: x.gospelSupport,
      createdAt: new Date(x.createdAt).toLocaleDateString()
    }));
  }
  const allRows: GridRowsProp = resultMap;
  return allRows;
};
