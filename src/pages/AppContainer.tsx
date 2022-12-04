import { ReactNode, useMemo } from 'react';
import React from 'react';
import { SWRConfig, SWRConfiguration, useSWRConfig } from 'swr';

import { useApi } from '../hooks/useApi';

interface AppContainerProps {
  children: ReactNode;
}

const METHODE = 'GET';

export function AppContainer({ children }: AppContainerProps) {
  // const { alert, renderAlertContainer } = useAlerts();
  const { cache } = useSWRConfig();

  const { makeRequest } = useApi();
  const swrConfig = useMemo<Partial<SWRConfiguration>>(
    () => ({
      cache,
      errorRetryCount: 0,
      fetcher: (url) => makeRequest(`${url}`, METHODE),
      /*onErrorRetry: (err,key) => {
        if (
          err &&
          (String(err.status).startsWith('4') ||
            String(err.status).startsWith('5'))
        ) {
          { console.log("lalala")}
          alert('error,Da ist leider etwas schiefgelaufen.');
          throw new Error(err);
        }else {
          { console.log("lalala",err.statusText)}
        }
      },*/
      revalidateOnFocus: false,
      suspense: false
    }),
    [makeRequest]
  );

  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
}
