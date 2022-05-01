import * as React from 'react';
import {GridColumns, GridRowsProp,} from '@mui/x-data-grid';
import {GridRenderCellParams} from "@mui/x-data-grid/models/params/gridCellParams";
import {Discipline} from "../../../models/Discipline";
import {
  readingColumns,
  readingRowsRendererByWeek,
  upsertReadingFormData,
  validateReading
} from "./reading/ReadingRender";
import {ResultsObject} from "../../util/ResultsObject";
import {
  prayerColumns,
  prayerRowsRendererByWeek,
  upsertPrayerFormData,
  validatePrayer
} from "./prayer/PrayerRender";
import {
  meditationColumns,
  meditationRowsRendererByWeek,
  upsertMeditationFormData,
  validateMeditation
} from "./meditation/MeditationRender";
import {
  gospelColumns,
  gospelRowsRendererByWeek,
  upsertGospelFormData,
  validateGospel
} from "./gospel/GospelRender";
import {
  fastingColumns,
  fastingRowsRendererByWeek,
  upsertFastingFormData,
  validateFasting
} from "./fasting/FastingRender";
import {
  godGivingColumns,
  godGivingRowsRendererByWeek,
  upsertGodGivingFormData,
  validateGodGiving
} from "./godGiving/GodGivingRender";
import {ReadingType} from "../../../models/Reading";
import {PrayerType} from "../../../models/Prayer";
import {RetreatType} from "../../../models/Meditation";
import {GospelType} from "../../../models/Gospel";
import {FastingType} from "../../../models/Fasting";
import {GodGivingType} from "../../../models/GodGiving";


export const disciplineRowsRendererByWeek = (data: ResultsObject<Discipline> | undefined, start: Date | null, methode: string, disciplineType: string): GridRowsProp => {
  switch (disciplineType) {
    case ReadingType.BIBLE||ReadingType.C_BOOK:
      return readingRowsRendererByWeek(data, start, methode)
    case PrayerType.ALONE || PrayerType.GROUP:
      return prayerRowsRendererByWeek(data, start, methode)
    case RetreatType.MEDITATION || RetreatType.RETREAT:
      return meditationRowsRendererByWeek(data, start, methode)
    case GospelType.GOSPEL || GospelType.SUPPORT || GospelType.CONTACT:
      return gospelRowsRendererByWeek(data, start, methode)
    case FastingType.COMPLETE || FastingType.PARTIAL:
      return fastingRowsRendererByWeek(data, start, methode)
    case GodGivingType.MONEY || GodGivingType.CHORE || GodGivingType.THANKS:
      return godGivingRowsRendererByWeek(data, start, methode)
    default:
      return []
  }
};

export const upsertDisciplineFormData = (postboxId:string,userId:string,start: string, end: string, create: boolean, params: GridRenderCellParams, disciplineType: string) => {
  switch (disciplineType) {
    case ReadingType.BIBLE||ReadingType.C_BOOK:
      return upsertReadingFormData(postboxId,userId,start, end, create, params,disciplineType)
    case PrayerType.ALONE || PrayerType.GROUP:
      return upsertPrayerFormData(postboxId,userId,start, end, create, params, disciplineType)
    case RetreatType.MEDITATION || RetreatType.RETREAT:
      return upsertMeditationFormData(postboxId,userId,start, end, create, params,disciplineType)
    case GospelType.GOSPEL || GospelType.SUPPORT || GospelType.CONTACT:
      return upsertGospelFormData(postboxId,userId,start, end, create, params, disciplineType)
    case FastingType.COMPLETE || FastingType.PARTIAL:
      return upsertFastingFormData(postboxId,userId,start, end, create, params, disciplineType)
    case GodGivingType.MONEY || GodGivingType.CHORE || GodGivingType.THANKS:
      return upsertGodGivingFormData(postboxId,userId,start, end, create, params, disciplineType)
    default:
      return undefined
  }
}

export const validateDiscipline = (upsertDiscipline: any, disciplineType: string, create: boolean): boolean => {
  switch (disciplineType) {
    case ReadingType.BIBLE||ReadingType.C_BOOK:
      return validateReading(upsertDiscipline, create)
    case PrayerType.ALONE || PrayerType.GROUP:
      return validatePrayer(upsertDiscipline, create)
    case RetreatType.MEDITATION || RetreatType.RETREAT:
      return validateMeditation(upsertDiscipline, create)
    case GospelType.GOSPEL || GospelType.SUPPORT || GospelType.CONTACT:
      return validateGospel(upsertDiscipline, create)
    case FastingType.COMPLETE || FastingType.PARTIAL:
      return validateFasting(upsertDiscipline, create)
    case GodGivingType.MONEY || GodGivingType.CHORE || GodGivingType.THANKS:
      return validateGodGiving(upsertDiscipline, create)
    default:
      return false
  }
}

export const disciplineColumns = (disciplineType: string): GridColumns => {
  switch (disciplineType) {
    case ReadingType.BIBLE||ReadingType.C_BOOK:
      return readingColumns(disciplineType)
    case PrayerType.ALONE || PrayerType.GROUP:
      return prayerColumns(disciplineType)
    case RetreatType.MEDITATION || RetreatType.RETREAT:
      return meditationColumns(disciplineType)
    case GospelType.GOSPEL || GospelType.SUPPORT || GospelType.CONTACT:
      return gospelColumns(disciplineType)
    case FastingType.COMPLETE || FastingType.PARTIAL:
      return fastingColumns(disciplineType)
    case GodGivingType.MONEY || GodGivingType.CHORE || GodGivingType.THANKS:
      return godGivingColumns(disciplineType)
    default:
      return []
  }
}

