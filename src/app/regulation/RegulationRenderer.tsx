import * as React from 'react';
import { GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';

import toNumber from '@mui/x-data-grid/lib/lodash/toNumber';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams';

import {
  Regulation,
  UpsertRegulationRequestSchema
} from '../../models/Regulation';
import { ResultsObject } from '../../models/ResultsObject';
import { UpsertActivityRequestSchema } from '../../models/Activity';

export const regulationRowsRenderer = (
  data: ResultsObject<Regulation> | undefined,
  methode: string
) => {
  let resultMap: readonly { [key: string]: any }[] = [];
  if (methode === 'get' || methode === '' || methode === 'createGet') {
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
        createdAt: x.createdAt
      }));
    }
  }
  if (methode === 'create') {
    return [
      {
        id: randomId(),
        prayerAlone: 0,
        prayerInGroup: 0,
        prayerNight: 0,
        bibleReading: 0,
        clReading: 0,
        thanksGiving: 0,
        godGiving: 0,
        partialFasting: 0,
        completeFasting: 0,
        retreat: 0,
        choreRepeat: 0,
        meditation: 0,
        gospelContact: 0,
        gospelSupport: 0,
        gospel: 0
      }
    ];
  }

  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const upsertRegulationFormData = (
  postboxId: string,
  params: GridRenderCellParams
) => {
  let prayerAlone = toNumber(params.getValue(params.id, 'prayerAlone'));
  let prayerInGroup = toNumber(params.getValue(params.id, 'prayerInGroup'));
  let prayerNight = toNumber(params.getValue(params.id, 'prayerNight'));
  let bibleReading = toNumber(params.getValue(params.id, 'bibleReading'));
  let clReading = toNumber(params.getValue(params.id, 'clReading'));
  let thanksGiving = toNumber(params.getValue(params.id, 'thanksGiving'));
  let partialFasting = toNumber(params.getValue(params.id, 'partialFasting'));
  let completeFasting = toNumber(params.getValue(params.id, 'completeFasting'));
  let retreat = toNumber(params.getValue(params.id, 'retreat'));
  let choreRepeat = toNumber(params.getValue(params.id, 'choreRepeat'));
  let meditation = toNumber(params.getValue(params.id, 'meditation'));
  let gospelContact = toNumber(params.getValue(params.id, 'gospelContact'));
  let gospelSupport = toNumber(params.getValue(params.id, 'gospelSupport'));
  let gospel = toNumber(params.getValue(params.id, 'gospel'));
  let godGiving = toNumber(params.getValue(params.id, 'godGiving'));

  return {
    postboxId: postboxId,
    prayerAlone: prayerAlone,
    prayerInGroup: prayerInGroup,
    prayerNight: prayerNight,
    bibleReading: bibleReading,
    clReading: clReading,
    thanksGiving: thanksGiving,
    godGiving: godGiving,
    partialFasting: partialFasting,
    completeFasting: completeFasting,
    retreat: retreat,
    choreRepeat: choreRepeat,
    meditation: meditation,
    gospel: gospel,
    gospelContact: gospelContact,
    gospelSupport: gospelSupport
  };
};

export const validateRegulation = (upsertRegulation: {}): boolean => {
  console.log(
    'fehler ' + { CreateActivityRequestSchema: UpsertActivityRequestSchema }
  );
  return (
    upsertRegulation !== undefined &&
    !UpsertRegulationRequestSchema.validate(upsertRegulation).error
  );
};


