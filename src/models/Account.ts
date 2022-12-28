export interface Account {
  id: string;
  name: string;
  userId: string;
  postboxId: string;
  prayerAlone: boolean;
  prayerInGroup: boolean;
  prayerNight: boolean;
  meditation: boolean;
  retreat: boolean;
  bibleReading: boolean;
  christianLiteratureReading: boolean;
  gospel: boolean;
  gospelContact: boolean;
  gospelSupport: boolean;
  partialFasting: boolean;
  completeFasting: boolean;
  choreRepeat: boolean;
  thanksGiving: boolean;
  godGiving: boolean;
  startWeek: string;
  endWeek: string;
  week: string;
  weekOfYear:number
  createdAt?: string;
}
