import axios, { Method, ResponseType } from 'axios';
import { useCallback } from 'react';

import { useKeycloak } from '@react-keycloak/web';

interface RequestOptions {
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
  responseType?: ResponseType;
}

export function useApi() {
  const { keycloak } = useKeycloak();

  const makeRequestWithFullResponse = useCallback(
    async <T>(
      url: string,
      method: Method,
      data?: any,
      options?: RequestOptions
    ) => {
      const response = await axios.request<T>({
        data,
      //  onUploadProgress: options?.onUploadProgress,
        headers: {
          Authorization: keycloak.token
            ? `Bearer ${keycloak.token}`
            : undefined,
          'Content-type': data
            ? data instanceof FormData
              ? 'multipart/form-data'
              : 'application/json'
            : undefined
        },
        method,
       // responseType: options?.responseType || 'json',
        url: `${process.env.REACT_APP_API_URL}${url}`
      });

      return response;
    },
    [keycloak.token]
  );

  const makeRequest = useCallback(
    async <T>(
      url: string,
      method: Method,
      data?: any,
      options?: RequestOptions
    ) => {
      return (await makeRequestWithFullResponse<T>(url, method, data, options))
        .data;
    },
    [makeRequestWithFullResponse]
  );

  return { makeRequest, makeRequestWithFullResponse };
}
