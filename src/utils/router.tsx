import React, { ReactElement } from 'react';
import HeraldersBody from "../heralders/base/HeraldersBody";
import {PostboxesSelect} from "../heralders/base/PostBoxesSelect";
import {PostboxModel} from "../heralders/models/PostboxModel";

export enum RouteKey {
  ACCOUNTGIVING,
  HERALDERS,
  POSTBOXES,
  POSTBOX
}

export interface Route {
  disabled?: boolean;
  element: ReactElement | null;
  path: string;
}

export const routes: {
  [key in RouteKey]: Route;
} = {
  [RouteKey.HERALDERS]: {
    element:  <HeraldersBody/>,
    path: '/'
  },
  [RouteKey.ACCOUNTGIVING]: {
    element:  <HeraldersBody/>,
    path: '/'
  }
  ,
  [RouteKey.POSTBOXES]: {
    element:  <PostboxesSelect/>,
    path: 'postboxes'
  }
  ,
  [RouteKey.POSTBOX]: {
    element:  <HeraldersBody/>,
    path: 'postboxes/:postboxId'
  }
};

export function getPostboxPath(postbox: PostboxModel) {
  return `/postboxes/${postbox.id}`;
}
