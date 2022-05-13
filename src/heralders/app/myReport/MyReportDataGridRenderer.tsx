import * as React from 'react';
import {Suspense, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import useSWR from "swr";
import {createTheme} from "@material-ui/core";
import {makeStyles} from "@mui/styles";
import {ResultsObject} from "../../models/ResultsObject";
import {SelectItem} from "../SelectItem";
import {DataGridRows} from "../DataGridRows";
import {disciplineColumns, disciplineRowsRendererByWeek} from "../discipline/DisciplinePrepare";
import {Discipline} from "../../models/Discipline";


interface MyReportDataGridRendererProps {
  postboxId: string,
  userId: string,
  path: string,
  menuItems: string[]
}

export function MyReportDataGridRenderer({
                                           postboxId,
                                           userId,
                                           path,
                                           menuItems
                                         }: MyReportDataGridRendererProps) {

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


  const {
    data: disciplineData,

  } = useSWR<ResultsObject<Discipline>>
  (`/postboxes/${postboxId}/users/${userId}/${path}-results?` +
    `&type=${disciplineType}&page=${page}&size=10&sortBy=CREATED_AT&order=DESC`);


  const columns = disciplineColumns(disciplineType)

  const rows = disciplineRowsRendererByWeek(disciplineData, "", methode, disciplineType)


  return disciplineData && columns && rows ? (
    <> <Container>
      <Typography component="div" className={"program"} style={
        {overflowY: 'auto'}}>

        <br/>
        <br/>
        <br/>

        {menuItems.length > 0 ? <div>
          <SelectItem menuItems={menuItems} setDisciplineType={setDisciplineType}
                      disciplineType={disciplineType}/>
        </div> : ""}
        <br/>
        <br/>

        <Suspense fallback={null}>
          <DataGridRows
            gridRowsProp={rows}
            gridColumns={columns} page={disciplineData.page} pageSize={disciplineData.size}
            total={disciplineData.total}
            onChangePage={onChangePage}/>
        </Suspense>
      </Typography>
    </Container>
    </>
  ) : (<>Es ist leider etwas schiefgelaufen</>);
}
