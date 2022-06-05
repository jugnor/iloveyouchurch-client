import { ReactNode, useMemo } from 'react';
import React from 'react';
import { SWRConfig } from 'swr';
import { Configuration } from 'swr/dist/types';

import { cache } from '../swr';
import { useApi } from '../hooks/useApi';

interface AppContainerProps {
  children: ReactNode;
}

const METHODE = 'GET';

export function AppContainer({ children }: AppContainerProps) {
 // const { alert, renderAlertContainer } = useAlerts();
  const { makeRequest } = useApi();
  const swrConfig = useMemo<Partial<Configuration>>(
    () => ({
      cache,
      errorRetryCount: 0,
      fetcher: (url) => makeRequest(`${url}`, METHODE),
      onError: (error) => {
        if (
          error &&
          (String(error.status).startsWith('4') ||
            String(error.status).startsWith('5'))
        ) {
          alert('error,Da ist leider etwas schiefgelaufen.');
          throw new Error(error);
        }
      },
      revalidateOnFocus: false,
      suspense: true
    }),
    [makeRequest]
  );

  return (
    <SWRConfig value={swrConfig}>
      {children}
    </SWRConfig>
  );
}
