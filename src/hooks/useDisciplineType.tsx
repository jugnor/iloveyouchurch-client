import { ReadingType } from '../models/Reading';
import { GodGivingType } from '../models/GodGiving';
import { DisciplineType } from '../models/Discipline';
import { FastingType } from '../models/Fasting';
import { RetreatType } from '../models/Meditation';
import { GospelType } from '../models/Gospel';

export function useDisciplineType(disciplineType: DisciplineType) {
  const translateType = () => {
    switch (disciplineType) {
      case ReadingType.BIBLE:
        return 'Bibel';
      case ReadingType.C_BOOK:
        return 'Christliche Literrature';
      case GodGivingType.CHORE:
        return 'Probe';
      case GodGivingType.MONEY:
        return 'Spende';
      case GodGivingType.THANKS:
        return 'Dansksagung';
      case FastingType.PARTIAL:
        return 'Teilfasten';
      case FastingType.COMPLETE:
        return 'Kompletes Fasten';
      case RetreatType.MEDITATION:
        return 'Meditation';
      case RetreatType.RETREAT:
        return 'Auszeit';
      case GospelType.SUPPORT:
        return 'Traktat';
      case GospelType.CONTACT:
        return 'Kontakt';
      case GospelType.GOSPEL:
        return 'Evangelisation';
    }
  };

  return { translateType };
}
