import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { PostboxModel, PostboxType } from '../../models/PostboxModel';
import DepartmentPostbox from './PostboxType/DepartmentPostbox';
import * as React from 'react';
import { Suspense, useCallback, useMemo } from 'react';
import { useUserProperties } from '../../hooks/useUserProperties';
import SystemPostbox from './PostboxType/SystemPostbox';

export default function Postbox() {
  const { t } = useTranslation();
  const { currentPostboxId } = useUserProperties();
  const elementUrl = useMemo(() => {
    return `/postboxes/${currentPostboxId}`;
  }, [currentPostboxId]);

  const { data: element } = useSWR<PostboxModel>(elementUrl, {
    suspense: false
  });

  return element ? (
    <Suspense fallback={null}>
      <>
        {element?.postboxType === PostboxType.DEPARTMENT ? (
          <DepartmentPostbox />
        ) : (
          <SystemPostbox />
        )}{' '}
      </>
    </Suspense>
  ) : (
    <>Es ist leider etwas schiefgelaufen</>
  );
}
