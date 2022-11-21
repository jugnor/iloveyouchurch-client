import { ReadingType } from '../models/Reading';
import { GodGivingType } from '../models/GodGiving';
import { DisciplineType } from '../models/Discipline';

export function useDisciplineType(disciplineType: DisciplineType) {
  const translateType = () => {
    switch (disciplineType) {
      case ReadingType.BIBLE:
        return 'Bibel';
      case ReadingType.C_BOOK:
        return 'Christliche Literrature';
      case GodGivingType.CHORE:
        return 'Probe';
    }
  };

  return { translateType };
}
