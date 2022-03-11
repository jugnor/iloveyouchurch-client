import React from 'react';
import {ActivityOrder} from "../../models/ActivityOrder";

export const getActivityOrder = (
  order: number
): ActivityOrder => {
  if (order == 1) {
    return ActivityOrder.ORDER1;
  } else if (order == 2) {
    return ActivityOrder.ORDER2
  } else if (order == 1) {
    return ActivityOrder.ORDER3;
  } else if (order == 2) {
    return ActivityOrder.ORDER4
  } else if (order == 1) {
    return ActivityOrder.ORDER5;
  } else if (order == 2) {
    return ActivityOrder.ORDER6
  }

  return ActivityOrder.ORDER7
}

export const getDayOfTheWeek = (
  order: number
): string => {
  if (order == 1) {
    return "Montag";
  } else if (order == 2) {
    return "Dienstag"
  } else if (order == 3) {
    return "Mittwoch";
  } else if (order == 4) {
    return "Donnerstag"
  } else if (order == 5) {
    return "Freitag";
  } else if (order == 6) {
    return "Samstag"
  }

  return "Sontag"

}
