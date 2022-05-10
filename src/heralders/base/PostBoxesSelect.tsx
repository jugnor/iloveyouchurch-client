import Header from "../headerFooter/Header";
import React from "react";
import classes from "*.module.scss";
import useSWR from "swr";
import {ResultsObject} from "../models/ResultsObject";
import {PostboxModel} from "../models/PostboxModel";
import {Box, IconButton, Typography} from "@mui/material";
import {Link} from 'react-router-dom';
import {getPostboxPath} from "../../utils/router";

export function PostboxesSelect() {
  const [page, setPage] = React.useState(0);
  const {
    data,
    error,
    mutate
  } =
    useSWR<ResultsObject<PostboxModel>>
    (`/postbox-results?page=${page}&size=5&sortBy=CREATED_AT&order=DESC`);

  const handlePageChange = (newPage: number) => {
    if (page >= 0) {
      setPage(newPage)
    }
  };

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
        <IconButton hidden={page <= 0} onClick={() => handlePageChange(page - 1)}/>
        <IconButton hidden={page + 1 > data.total / data.size}
  onClick={() => handlePageChange(page + 1)}/>
      </div>
    </div>) : (<>Es ist leider etwas schiefgelaufen</>);
}
