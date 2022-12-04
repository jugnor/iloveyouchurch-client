import { Reading, ReadingType, UpsertReadingRequest } from './Reading';
import { GodGiving, GodGivingType, UpsertGodGivingRequest } from './GodGiving';
import { Prayer, PrayerType, UpsertPrayerRequest } from './Prayer';
import { Meditation, RetreatType, UpsertMeditationRequest } from './Meditation';
import { Gospel, GospelType, UpsertGospelRequest } from './Gospel';
import { FastingType, Fasting, UpsertFastingRequest } from './Fasting';

export type Discipline = Reading &
  GodGiving &
  Prayer &
  Meditation &
  Gospel &
  Fasting;

export type UpsertDisciplineRequest =
  | UpsertReadingRequest
  | UpsertGodGivingRequest
  | UpsertPrayerRequest
  | UpsertMeditationRequest
  | UpsertGospelRequest
  | UpsertFastingRequest;

export type DisciplineType =
  | GodGivingType
  | ReadingType
  | PrayerType
  | RetreatType
  | GospelType
  | FastingType;
