import {useTranslation} from 'react-i18next';
import {useMatch} from 'react-router-dom';
import useSWR from 'swr';
import {PostboxModel} from "../models/PostboxModel";
import DepartmentPostbox from "./DepartmentPostbox";
import * as React from "react";
import {Suspense, useCallback, useMemo} from "react";
import {RouteKey, routes} from "../utils/router";
import {PostboxType} from "../models/PostboxType";


export default function Postbox() {
  const {t} = useTranslation();
  const postboxPageMatch = useMatch(routes[RouteKey.POSTBOX_ID]);

  const elementUrl = useMemo(() => {
    if (postboxPageMatch) {
      return `/postboxes/${postboxPageMatch.params.postboxId}`;
    }

    return null;
  }, [postboxPageMatch]);


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

