import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import useSWR from 'swr';
import {PostboxModel} from "../../models/PostboxModel";
import HeraldersBody from "../../base/HeraldersBody";
import * as React from "react";


export function Postbox() {
  const {t} = useTranslation();
  const {postboxId: currentPostboxId} = useParams();

  const {data} = useSWR<PostboxModel>(`/postboxes/${currentPostboxId}`);

  return data ? (
   data?.name==='HERALDERS'?
      <HeraldersBody/>:''


)  : (<>Es ist leider etwas schiefgelaufen</>);
}

export {Postbox as default} from './Postbox';
