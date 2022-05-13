import React, { ReactElement } from 'react';
import HeraldersBody from "../heralders/base/HeraldersBody";
import {PostboxesSelect} from "../heralders/base/PostBoxesSelect";
import {PostboxModel} from "../heralders/models/PostboxModel";
import {Navigate} from "react-router-dom";
import Postbox from "../heralders/base/Postbox";

export enum RouteKey {
  HOME,
  POSTBOXES,
  POSTBOX_ID,
}

export interface Route {
  disabled?: boolean;
  element: ReactElement | null;
  path: string;
}

export const routes: {
  [key in RouteKey]: Route;
} = {
  [RouteKey.HOME]: {
    element:  <Navigate to="/postboxes" />,
    path: '/'
  },

  [RouteKey.POSTBOXES]: {
    element:  <PostboxesSelect/>,
    path: '/postboxes'
  }
  ,
  [RouteKey.POSTBOX_ID]: {
    element:  <Postbox/>,
    path: "/postboxes/:postboxId"
  }
};

export function getPostboxPath(postbox: PostboxModel) {

  return `/postboxes/${postbox.id}`;
}
