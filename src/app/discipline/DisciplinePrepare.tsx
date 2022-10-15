import * as React from 'react';
import { GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams';
import { Discipline } from '../../models/Discipline';
import {
  readingColumns2,
  readingRowsRendererByWeek,
  upsertReadingFormData,
  validateReading
} from './reading/ReadingRender';
import { ResultsObject } from '../../models/ResultsObject';
import {
  prayerColumns2,
  prayerRowsRendererByWeek,
  upsertPrayerFormData,
  validatePrayer
} from './prayer/PrayerRender';
import {
  meditationColumns2,
  meditationRowsRendererByWeek,
  upsertMeditationFormData,
  validateMeditation
} from './meditation/MeditationRender';
import {
  gospelCol,
  gospelRowsRendererByWeek,
  upsertGospelFormData,
  validateGospel
} from './gospel/GospelRender';
import {
  fastingColumns2,
  fastingRowsRendererByWeek,
  upsertFastingFormData,
  validateFasting
} from './fasting/FastingRender';
import {
  upsertGodGivingFormData,
  validateGodGiving
} from './godGiving/GodGivingRender';
import { ReadingType } from '../../models/Reading';
import { PrayerType } from '../../models/Prayer';
import { RetreatType } from '../../models/Meditation';
import { GospelType } from '../../models/Gospel';
import { FastingType } from '../../models/Fasting/Fasting';
import { GodGivingType } from '../../models/GodGiving';

export const disciplineRowsRendererByWeek = (
  data: ResultsObject<Discipline> | undefined,
  startWeek: string,
  methode: string,
  disciplineType: string
): GridRowsProp => {
  switch (disciplineType) {
    case ReadingType.BIBLE:
    case ReadingType.C_BOOK:
      return readingRowsRendererByWeek(data, startWeek, methode);
    case PrayerType.ALONE:
    case PrayerType.GROUP:
      return prayerRowsRendererByWeek(data, startWeek, methode);
    case RetreatType.MEDITATION:
    case RetreatType.RETREAT:
      return meditationRowsRendererByWeek(data, startWeek, methode);
    case GospelType.GOSPEL:
    case GospelType.SUPPORT:
    case GospelType.CONTACT:
      return gospelRowsRendererByWeek(data, startWeek, methode);
    case FastingType.COMPLETE:
    case FastingType.PARTIAL:
      return fastingRowsRendererByWeek(data, startWeek, methode);
    case GodGivingType.MONEY:
    case GodGivingType.CHORE:
    case GodGivingType.THANKS:
      return []
    default:
      return [];
  }
};

export const upsertDisciplineFormData = (
  postboxId: string,
  userId: string,
  start: string,
  end: string,
  create: boolean,
  params: GridRenderCellParams,
  disciplineType: string
) => {
  switch (disciplineType) {
    case ReadingType.BIBLE:
    case ReadingType.C_BOOK:
      return upsertReadingFormData(
        postboxId,
        userId,
        start,
        end,
        create,
        params,
        disciplineType
      );
    case PrayerType.ALONE:
    case PrayerType.GROUP:
      return upsertPrayerFormData(
        postboxId,
        userId,
        start,
        end,
        create,
        params,
        disciplineType
      );
    case RetreatType.MEDITATION:
    case RetreatType.RETREAT:
      return upsertMeditationFormData(
        postboxId,
        userId,
        start,
        end,
        create,
        params,
        disciplineType
      );
    case GospelType.GOSPEL:
    case GospelType.SUPPORT:
    case GospelType.CONTACT:
      return upsertGospelFormData(
        postboxId,
        userId,
        start,
        end,
        create,
        params,
        disciplineType
      );
    case FastingType.COMPLETE:
    case FastingType.PARTIAL:
      return upsertFastingFormData(
        postboxId,
        userId,
        start,
        end,
        create,
        params,
        disciplineType
      );
    case GodGivingType.MONEY:
    case GodGivingType.CHORE:
    case GodGivingType.THANKS:
      return upsertGodGivingFormData(
        postboxId,
        userId,
        start,
        end,
        create,
        params,
        disciplineType
      );
    default:
      return undefined;
  }
};

export const validateDiscipline = (
  upsertDiscipline: any,
  disciplineType: string,
  create: boolean
): boolean => {
  switch (disciplineType) {
    case ReadingType.BIBLE:
    case ReadingType.C_BOOK:
      return validateReading(upsertDiscipline, create);
    case PrayerType.ALONE:
    case PrayerType.GROUP:
      return validatePrayer(upsertDiscipline, create);
    case RetreatType.MEDITATION:
    case RetreatType.RETREAT:
      return validateMeditation(upsertDiscipline, create);
    case GospelType.GOSPEL:
    case GospelType.SUPPORT:
    case GospelType.CONTACT:
      return validateGospel(upsertDiscipline, create);
    case FastingType.COMPLETE:
    case FastingType.PARTIAL:
      return validateFasting(upsertDiscipline, create);
    case GodGivingType.MONEY:
    case GodGivingType.CHORE:
    case GodGivingType.THANKS:
      return validateGodGiving(upsertDiscipline, create);
    default:
      return false;
  }
};

export const disciplineColumns = (disciplineType: string): GridColumns => {
  switch (disciplineType) {
    case ReadingType.BIBLE:
    case ReadingType.C_BOOK:
      return readingColumns2(disciplineType);
    case PrayerType.ALONE:
    case PrayerType.GROUP:
      return prayerColumns2(disciplineType);
    case RetreatType.MEDITATION:
    case RetreatType.RETREAT:
      return meditationColumns2(disciplineType);
    case GospelType.GOSPEL:
    case GospelType.SUPPORT:
    case GospelType.CONTACT:
      return gospelCol(disciplineType);
    case FastingType.COMPLETE:
    case FastingType.PARTIAL:
      return fastingColumns2(disciplineType);
    case GodGivingType.MONEY:
    case GodGivingType.CHORE:
    case GodGivingType.THANKS:
      return [];
    default:
      return [];
  }
};
