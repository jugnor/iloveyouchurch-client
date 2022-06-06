import {useTranslation} from 'react-i18next';
import useSWR from 'swr';
import {PostboxModel} from "../models/PostboxModel";
import DepartmentPostbox from "./DepartmentPostbox";
import * as React from "react";
import {Suspense, useCallback, useMemo} from "react";
import {PostboxType} from "../models/PostboxType";
import {useUserProperties} from "../hooks/useUserProperties";


export default function Postbox() {
  const {t} = useTranslation();
  const {currentPostboxId} = useUserProperties();
  const elementUrl = useMemo(() => {

    return `/postboxes/${currentPostboxId}`;

  }, [currentPostboxId]);


  const {
    data: element,
    error,
    mutate
  } = useSWR<PostboxModel>(elementUrl, {
    suspense: false
  });

  const refreshData = useCallback(() => {
    mutate();
  }, [mutate]);


  return element ? (
    <Suspense fallback={null}>
      <>
        {element?.postboxType === PostboxType.DEPARTMENT ?
          <DepartmentPostbox/> : ''}</>


    </Suspense>) : (<>Es ist leider etwas schiefgelaufen</>);
}

