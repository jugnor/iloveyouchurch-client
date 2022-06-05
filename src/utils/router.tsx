import React, { ReactElement } from 'react';
import DepartmentPostbox from "../base/DepartmentPostbox";
import {PostboxesSelect} from "../base/PostBoxesSelect";
import {PostboxModel} from "../models/PostboxModel";
import {Navigate} from "react-router-dom";
import Postbox from "../base/Postbox";

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
