import Header from "../headerFooter/Header";
import React from "react";
import classes from "*.module.scss";
import useSWR from "swr";
import {ResultsObject} from "../models/ResultsObject";
import {PostboxModel} from "../models/PostboxModel";
import {Box, Button, Typography} from "@mui/material";
import {Link, useParams} from 'react-router-dom';
import { getPostboxPath } from "../../utils/router";

export function PostboxesSelect() {
  const { postboxId: currentPostboxId } = useParams();
  const [page, setPage] = React.useState(0);

  const {
    data,
    error,
    mutate
  } =
    useSWR<ResultsObject<PostboxModel>>
    (`/postbox-results?page=${page}&size=5&sortBy=CREATED_AT&order=DESC`);

  return data ? (
    <div className="Acc">
      <div className={classes.grow}>

        <Header/>
        {data.items.map(postbox =>

          <Link to={getPostboxPath(postbox)}>

            <Box component="span" sx={{p: 2, border: '1px dashed grey'}}>
              <Typography>{postbox.name}</Typography>
            </Box>
          </Link>
        )}

      </div>
    </div>) : (<>Es ist leider etwas schiefgelaufen</>);
}
