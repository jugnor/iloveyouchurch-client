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


export const disciplineRowsRendererByWeek = (data: ResultsObject<Discipline> | undefined, start: Date | null, methode: string, disciplineType: string): GridRowsProp => {
  switch (disciplineType) {
    case "BIBLE" || "CBOOK":
      return readingRowsRendererByWeek(data, start, methode)
    default:
      return []
  }
};

export const upsertDisciplineFormData = (start: string, end: string, create: boolean, params: GridRenderCellParams, disciplineType: string) => {
  switch (disciplineType) {
    case "BIBLE" || "CBOOK":
      return upsertReadingFormData(start, end, create, params)
    default:
      return undefined
  }
}

export const validateDiscipline = (upsertReading: {}, disciplineType: string): boolean => {
  switch (disciplineType) {
    case "BIBLE" || "CBOOK":
      return validateReading(upsertReading)
    default:
      return undefined
  }
}

export const disciplineColumns = (disciplineType: string): GridColumns => {
  switch (disciplineType) {
    case "BIBLE" || "CBOOK":
      return readingColumns
    default:
      return undefined
  }
}

