import * as React from 'react';
import {GridColumns, GridRowsProp,} from '@mui/x-data-grid';
import {randomId} from '@mui/x-data-grid-generator';

import {toDate} from "date-fns";
import {ResultsObject} from "../../models/ResultsObject";
import {Account} from "../../models/Account";


export const accountRowsRendererByWeek = (data: ResultsObject<Account> | undefined, startWeek: string, methode: string) => {

  let resultMap: readonly { [key: string]: any; }[] = []
  if (methode === "get" + startWeek || methode === "" || methode === "createGet") {
    if (data !== undefined) {
      resultMap = data.items.map(x => ({
        id: randomId(),
        aId: x.id,
        postboxId: x.postboxId,
        userId: x.userId,
        prayerAlone: x.prayerAlone,
        prayerInGroup: x.prayerInGroup,
        meditation: x.meditation,
        retreat: x.retreat,
        bibleReading: x.bibleReading,
        christianLiteratureReading: x.christianLiteratureReading,
        gospel: x.gospel,
        partialFasting: x.partialFasting,
        completeFasting: x.completeFasting,
        choreRepeat: x.choreRepeat,
        thanksGiving: x.thanksGiving,
        godGiving: x.godGiving,
        week: "von " + toDate(Date.parse(x.startWeek)).toLocaleDateString() + " bis " + toDate(Date.parse(x.endWeek)).toLocaleDateString()
      }));
    }
  }
  const allRows: GridRowsProp = resultMap;
  return allRows;
};

export const accountColumns = (disc:string): GridColumns => [
  {
    field: 'week',
    headerName: 'Woche',
    width: 220,
    editable: false,
  },
  {
    field: 'name', headerName: 'Name', type: 'boolean',
    editable: true, resizable: true, width: 100
  },
  {
    field: 'prayerAlone', headerName: 'Gebet-Allein', type: 'boolean',
    editable: true, resizable: true, width: 100
  },
  {
    field: 'prayerInGroup', headerName: 'Gebet in Gruppe', type: 'boolean',
    editable: true, resizable: true, width: 150
  },
  {
    field: 'meditation', headerName: 'Meditation', type: 'boolean',
    editable: true, resizable: true, width: 100
  },
  {
    field: 'bibleReading', headerName: 'Bibel-Lesen', type: 'boolean',
    editable: true, resizable: true, width: 100
  },
  {
    field: 'thanksGiving', headerName: 'Danksagung', type: 'boolean',
    editable: true, resizable: true, width: 100
  },
  {
    field: 'partialFasting', headerName: 'Teil-Fasten', type: 'boolean',
    editable: true, resizable: true, width: 100
  },
  {
    field: 'completeFasting', headerName: 'Komplettes Fasten', type: 'boolean',
    editable: true, resizable: true, width: 100
  },

  {
    field: 'choreRepeat', headerName: 'Probe', type: 'boolean',
    editable: true, resizable: true, width: 100
  },
  {
    field: 'godGiving', headerName: 'Spende', type: 'boolean',
    editable: true, resizable: true, width: 100
  },
  {
    field: 'gospel', headerName: 'Evangelisation', type: 'boolean',
    editable: true, resizable: true, width: 100,
  },
  {
    field: 'retreat', headerName: 'Auszeit', type: 'boolean',
    editable: true, resizable: true, width: 100
  },
  {
    field: 'christianLiteratureReading', headerName: 'Buch-Lesen', type: 'boolean',
    editable: true, resizable: true, width: 100
  },
];
