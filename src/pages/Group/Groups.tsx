import Header from '../../headerFooter/Header';
import React, { Suspense } from 'react';
import useSWR from 'swr';
import { ResultsObject } from '../../models/ResultsObject';
import { GroupModel } from '../../models/GroupModel';
import { Box, Card, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { getGroupPath } from '../../utils/router';

export function Groups() {
  const [page, setPage] = React.useState(0);
  const { data } = useSWR<ResultsObject<GroupModel>>(
    `/group-results?page=${page}&size=6`
  );

  const handlePageChange = (newPage: number) => {
    if (page >= 0) {
      setPage(newPage);
    }
  };

  return data ? (
    <Suspense fallback={null}>
      <Header message={'Ein Program vom I LOVE YOU CHURCH'} />

      <br />
      <div
        className="background-image"
        style={{
          backgroundImage: 'url(gebet_vision.jpeg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '110vh',
          overflowX: 'auto',
          overflowY: 'scroll',
          position: 'absolute'
        }}
      ></div>
      <Typography
        component="div"
        className={'group'}
        style={{ overflowY: 'auto' }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1>Wählen Sie Bitte eine Anwendung aus</h1>
        </div>

        {data.items.map((group) => (
          <div style={{ textAlign: 'center' }}>
            <Link to={getGroupPath(group)}>
              <Box style={{ color: 'darkred' }} sx={{ p: 3, minWidth: 100 }}>
                <Card variant="outlined">
                  <h3>{group.groupName}</h3>
                </Card>
              </Box>
            </Link>
          </div>
        ))}

        <IconButton
          disabled={page <= 0}
          onClick={() => handlePageChange(page - 1)}
        >
          <h4>Vorherige Seite</h4>
        </IconButton>

        <IconButton
          style={{ float: 'right' }}
          disabled={page + 1 >= data.total / data.size}
          onClick={() => handlePageChange(page + 1)}
        >
          <h4>Nächste Seite </h4>
        </IconButton>
        <h3 style={{ textAlign: 'center' }}>Aktuelle Seite ({page + 1})</h3>
        <h3 style={{ textAlign: 'center' }}>
          Gesamte Anwendungen ({data.total})
        </h3>
      </Typography>
    </Suspense>
  ) : (
    <>Es ist leider etwas schiefgelaufen</>
  );
}
