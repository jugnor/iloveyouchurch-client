import {Reading, UpsertReadingRequest} from "./Reading";
import {GodGiving, UpsertGodGivingRequest} from "./GodGiving";
import {Prayer, UpsertPrayerRequest} from "./Prayer";
import {Meditation, UpsertMeditationRequest} from "./Meditation";
import {Gospel, UpsertGospelRequest} from "./Gospel";
import {Fasting, UpsertFastingRequest} from "./Fasting";

export type Discipline = Reading & GodGiving & Prayer & Meditation & Gospel & Fasting

export type UpsertDisciplineRequest =
  UpsertReadingRequest
  & UpsertGodGivingRequest
  & UpsertPrayerRequest
  & UpsertMeditationRequest
  & UpsertGospelRequest
  & UpsertFastingRequest

