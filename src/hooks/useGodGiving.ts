import useSWR, { mutate } from 'swr';
import { GodGiving, GodGivingType } from '../models/GodGiving';

export function useGodGiving(
  postboxId: string,
  godGivingType: GodGivingType,
  weekOfYear: number
) {
  const {
    data: godGivingData,
    error,
    isValidating,
    mutate
  } = useSWR<GodGiving>(
    `/postboxes/${postboxId}/god-givings?` +
      `godGivingType=${godGivingType}&weekOfYear=${weekOfYear}`
  );
  return { godGivingData, isValidating, error, mutate };
}
