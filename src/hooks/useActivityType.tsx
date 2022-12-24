import { ActivityType } from '../models/ActivityType';

export function useActivityType(activityType: ActivityType) {
  const translateType = () => {
    switch (activityType) {
      case ActivityType.ANNOUNCEMENT:
        return 'Ankündigung';
      case ActivityType.NEWS:
        return 'Information';
      case ActivityType.PENALTY:
        return 'Straffe';
      case ActivityType.EVENT:
        return 'Event';
      default:
        return 'Program';
    }
  };

  return { translateType };
}
