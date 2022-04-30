
import {Reading, UpsertReadingRequest} from "./Reading";
import {UpsertGodGivingRequest, GodGiving} from "./GodGiving";

export type Discipline = Reading&GodGiving

export type UpsertDisciplineRequest = UpsertReadingRequest&UpsertGodGivingRequest

