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


export const disciplineRowsRendererByWeek = (data: ResultsObject<Discipline> | undefined, start: Date | null, methode: string, disciplineType: string): GridRowsProp => {
  switch (disciplineType) {
    case "bible" || "cBook":
      return readingRowsRendererByWeek(data, start, methode)
    case "alone" || "group":
      return prayerRowsRendererByWeek(data, start, methode)
    case "meditation" || "retreat":
      return meditationRowsRendererByWeek(data, start, methode)
    case "gospel" || "support" || "contact":
      return gospelRowsRendererByWeek(data, start, methode)
    case "complete" || "partial":
      return fastingRowsRendererByWeek(data, start, methode)
    case "money" || "chore" || "thanks":
      return godGivingRowsRendererByWeek(data, start, methode)
    default:
      return []
  }
};

export const upsertDisciplineFormData = (start: string, end: string, create: boolean, params: GridRenderCellParams, disciplineType: string) => {
  switch (disciplineType) {
    case "bible" || "cBook":
      return upsertReadingFormData(start, end, create, params)
    case "alone" || "group":
      return upsertPrayerFormData(start, end, create, params, disciplineType)
    case "meditation" || "retreat":
      return upsertMeditationFormData(start, end, create, params)
    case "gospel" || "support" || "contact":
      return upsertGospelFormData(start, end, create, params, disciplineType)
    case "complete" || "partial":
      return upsertFastingFormData(start, end, create, params, disciplineType)
    case "money" || "chore" || "thanks":
      return upsertGodGivingFormData(start, end, create, params, disciplineType)
    default:
      return undefined
  }
}

export const validateDiscipline = (upsertDiscipline: any, disciplineType: string, create: boolean): boolean => {
  switch (disciplineType) {
    case "bible" || "cBook":
      return validateReading(upsertDiscipline, create)
    case "alone" || "group":
      return validatePrayer(upsertDiscipline, create)
    case "meditation" || "retreat":
      return validateMeditation(upsertDiscipline, create)
    case "gospel" || "support" || "contact":
      return validateGospel(upsertDiscipline, create)
    case "complete" || "partial":
      return validateFasting(upsertDiscipline, create)
    case "money" || "chore" || "thanks":
      return validateGodGiving(upsertDiscipline, create)
    default:
      return false
  }
}

export const disciplineColumns = (disciplineType: string): GridColumns => {
  switch (disciplineType) {
    case "bible" || "cBook":
      return readingColumns
    case "alone" || "group":
      return prayerColumns(disciplineType)
    case "meditation" || "retreat":
      return meditationColumns(disciplineType)
    case "gospel" || "support" || "contact":
      return gospelColumns(disciplineType)
    case "complete" || "partial":
      return fastingColumns(disciplineType)
    case "money" || "chore" || "thanks":
      return godGivingColumns(disciplineType)
    default:
      return []
  }
}

