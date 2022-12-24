import * as React from 'react';
import { Suspense, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@material-ui/core/Container';
import { DataGridRows } from '../../../../../../app/DataGridRows';
import useSWR from 'swr';
import {
  Regulation,
  setRegulationColumns,
  setRegulationRows
} from '../../../../../../models/Regulation';
import { ResultsObject } from '../../../../../../models/ResultsObject';
import { SelectElement, SelectItem } from '../../../../../../app/SelectItem';
import { ActivityType } from '../../../../../../models/ActivityType';
import { RetreatType } from '../../../../../../models/Meditation';
import { useTranslation } from 'react-i18next';
import { RegulationRecapInputForm } from './RegulationRecapInputForm';
import { Stack } from '@mui/material';

interface RegulationRecapProps {
  postboxId: string;
}

export function RegulationRecap(regulationRecapProps: RegulationRecapProps) {
  const [page, setPage] = React.useState(0);
  const [disciplineType, setDisciplineType] = useState<SelectElement>(
    RetreatType.MEDITATION
  );
  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };
  const { t } = useTranslation();

  const columns = setRegulationColumns();

  const { data: result } = useSWR<ResultsObject<Regulation>>(
    `/postboxes/${regulationRecapProps.postboxId}/regulation-results?` +
      `page=${page}&size=5&sortBy=CREATED_AT&order=DESC`
  );

  const rows = setRegulationRows(result);

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
              <Stack style={{ display: 'flex', backgroundColor: '#F0F8FF' }}>
                {' '}
                <Typography color={'red'}>
                  <h2>
                    {t(
                      'Für jede Disziplin sind die unterstehenden Zahlen pro Woche zu erreichen'
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
