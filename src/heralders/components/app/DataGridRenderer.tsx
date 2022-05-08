import * as React from 'react';
import {Suspense, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import useSWR from "swr";
import {createTheme} from "@material-ui/core";
import {makeStyles} from "@mui/styles";
import {ResultsObject} from "../util/ResultsObject";
import {activityColumns, activityRowsRendererByType} from "./activity/ActivityPrepare";
import {disciplineColumns, disciplineRowsRendererByWeek} from "./discipline/DisciplinePrepare";
import {Discipline} from "../../models/Discipline";
import {Activity} from "../../models/Activity";
import {SelectItem} from "./SelectItem";
import {DataGridRows} from "./DataGridRows";
import {Divider} from "@mui/material";


interface DataGridRendererProps {
  postboxId: string,
  userId: string,
  path: string
  type: string
  menuItems: string[]
}

export function DataGridRenderer({
                                   postboxId,
                                   userId,
                                   path,
                                   type,
                                   menuItems
                                 }: DataGridRendererProps) {

  const defaultTheme = createTheme();

  const useStyles = makeStyles(
    (theme) => ({
      actions: {
        color: theme.palette.text.secondary,
      },
      textPrimary: {
        color: theme.palette.text.primary,
      },
    }),
    {defaultTheme},
  );

  const getDisciplineType = (): string => {
    const first = menuItems.at(0);
    if (first !== undefined) {
      const second = first.split("|").at(0);
      if (second !== undefined) {
        return second;
      }
    }
    return "";
  };

  const [page, setPage] = React.useState(0);
  const [disciplineType, setDisciplineType] = useState<string>(getDisciplineType());

  const [methode, setMethode] = useState<string>('');


  const onChangePage = (newPage: number) => {
    setPage(newPage);
    setMethode("get")
  };

  let dataR
  let rows;
  let columnsAction;
  if (type === 'Activity') {
    columnsAction = activityColumns(disciplineType)
    const {
      data,
      error,
      mutate
    } =
      useSWR<ResultsObject<Activity>>
      (`/postboxes/${postboxId}/activity-results?` +
        `&type=${disciplineType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`);
    dataR = data
    rows = activityRowsRendererByType(data, methode)

  } else if (type === "Discipline") {
    columnsAction = disciplineColumns(disciplineType)
    let {
      data,
      error,
      mutate
    } = useSWR<ResultsObject<Discipline>>
    (`/postboxes/${postboxId}/users/${userId}/${path}-results?` +
      `&type=${disciplineType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`);
    dataR = data
    rows = disciplineRowsRendererByWeek(data, "", methode, disciplineType)
  }

  return dataR && columnsAction && rows ? (
    <> <Container>
      <Typography component="div" className={"program"} style={
        {overflowY: 'auto'}}>

        <br/>
        <br/>
        <br/>

        <div>
          <SelectItem menuItems={menuItems} setDisciplineType={setDisciplineType}
                      disciplineType={disciplineType}/>
        </div>
        <br/>
        <br/>

        <Suspense fallback={null}>
          <DataGridRows
            gridRowsProp={rows}
            gridColumns={columnsAction} page={dataR.page} pageSize={dataR.size} total={dataR.total}
            onChangePage={onChangePage}/>
        </Suspense>
      </Typography>
    </Container>
    </>
  ) : (<>Es ist leider etwas schiefgelaufen</>);
}
