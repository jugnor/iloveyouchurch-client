import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@material-ui/core/Container';
import { DataGridRows } from '../../../../../../shared/DataGridRows';
import useSWR from 'swr';
import { Regulation } from '../../../../../../models/Regulation';
import { ResultsObject } from '../../../../../../models/ResultsObject';
import { useTranslation } from 'react-i18next';
import { RegulationRecapInputForm } from './RegulationRecapInputForm';
import { Stack } from '@mui/material';

interface RegulationRecapProps {
  groupName: string;
}

export function RegulationRecap(regulationRecapProps: RegulationRecapProps) {
  const { t } = useTranslation();

  const { data: result } = useSWR<ResultsObject<Regulation>>(
    `/api/groups/${regulationRecapProps.groupName}/regulation-results?` +
      `page=0&size=5&sortBy=CREATED_AT&order=DESC`
  );

  return result ? (
    <>
      {' '}
      <Container>
        <Typography
          component="div"
          className={'program'}
          style={{ overflowY: 'auto' }}
        >
          {result.total === 0 ? (
            <div style={{ display: 'flex', backgroundColor: '#F0F8FF' }}>
              {' '}
              <Typography color={'red'}>
                <h2>{t('Es liegt momentan keine Charta vor')}</h2>
              </Typography>{' '}
            </div>
          ) : (
            <div>
              <Stack
                style={{
                  display: 'flex',
                  backgroundColor: '#F0F8FF',
                  marginLeft: '1em'
                }}
              >
                {' '}
                <Typography color={'red'}>
                  <h2>
                    {t(
                      'Um positiv bewerten zu werden sollen die Nutzer die eingetragenen Zahlen pro Woche erreichen'
                    )}
                  </h2>
                </Typography>{' '}
              </Stack>
              <Suspense fallback={null}>
                <RegulationRecapInputForm regulation={result.items?.at(0)} />
              </Suspense>
            </div>
          )}
        </Typography>
      </Container>
    </>
  ) : (
    <>Es ist leider etwas schiefgelaufen</>
  );
}
