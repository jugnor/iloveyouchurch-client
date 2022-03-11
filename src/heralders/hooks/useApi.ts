import axios, {Method, ResponseType} from 'axios';
import {useCallback} from 'react';

import {useKeycloak} from '@react-keycloak/web';

export interface RequestOptions {
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
  responseType?: ResponseType;
}

export function useApi() {

  const {keycloak} = useKeycloak();
  const apiUrl = process.env.REACT_APP_API_URL;
  const makeRequestWithFullResponse = useCallback(
    async <T>(
      url: string,
      method: Method,
      data?: any,
      optionsUpload?: (progressEvent: ProgressEvent) => void,
      optionsResponseType?: ResponseType
    ) => {
      return await axios.request<T>({
        data,
        onUploadProgress: optionsUpload,
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
        responseType: optionsResponseType || 'json',
        url: `${apiUrl}${encodeURI(url)}`
      });
    },
    [keycloak.token, apiUrl]
  );

  const makeRequest = useCallback(
    async <T>(
      url: string,
      method: Method,
      data?: any,
      optionsUpload?: (progressEvent: ProgressEvent) => void,
      optionsResponseType?: ResponseType
    ) => {
      return (await makeRequestWithFullResponse<T>(url, method, data,optionsUpload,optionsResponseType ))
        // return (await makeRequestWithFullResponse<T>(url, method, data))
        .data;
    },
    [makeRequestWithFullResponse]
  );

  return {makeRequest, makeRequestWithFullResponse};

}
