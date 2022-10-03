import * as React from 'react';
import { Suspense, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { GridActionsCellItem } from '@mui/x-data-grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useSWR from 'swr';
import { ResultsObject } from '../../../models/ResultsObject';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams';
import { AlertColor } from '@mui/material/Alert';
import { AlertMessage } from '../../ArletMessageRenderer';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { DataGridRows } from '../../DataGridRows';
import { DialogMessageRenderer } from '../../DialogMessageRenderer';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useFile } from '../../../hooks/useFile';
import {
  fileColumns,
  fileRowsRenderer,
  upsertFileFormData,
  validateUpsertFile
} from './FileRenderer';
import { FileModel, UpdateFileRequest } from '../../../models/File';
import FileViewModal from '../../FileViewModal';

interface FileActionProps {
  postboxId: string;
  action: boolean;
}

export function FileAction({ postboxId, action }: FileActionProps) {
  const defaultTheme = createTheme();

  const useStyles = makeStyles(
    (theme) => ({
      actions: {
        color: theme.palette.text.secondary
      },
      textPrimary: {
        color: theme.palette.text.primary
      }
    }),
    { defaultTheme }
  );
  /*const getDisciplineType = (): string => {
    const first = menuItems.at(0);
    if (first !== undefined) {
      const second = first.split("|").at(0);
      if (second !== undefined) {
        return second;
      }
    }
    return "";
  };*/

  const classes = useStyles();
  const [params, setParams] = useState<GridRenderCellParams>();
  const [page, setPage] = React.useState(0);
  const [messageAlert, setMessageAlert] = useState<string>('');
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [openAlert, setOpenAlert] = React.useState(false);
  const [methode, setMethode] = useState<string>('');
  const [addFile, setAddFile] = useState<File>();
  const [openViewFile, setOpenViewFile] = useState<boolean>(false);

  const { uploadFile, deleteFileMetaData, updateFileMetaData } =
    useFile(postboxId);

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && event.target.files !== undefined) {
      setAddFile(event.target.files[0]);
    }
  };

  const handleClickOpenDialog =
    (params: GridRenderCellParams) =>
    (event: { stopPropagation: () => void }) => {
      setOpenDialog(true);
      setParams(params);
    };

  const handleViewClick =
    (params: GridRenderCellParams) =>
    (event: { stopPropagation: () => void }) => {
      setOpenViewFile(true);
      setParams(params);
    };

  const onChangePage = (newPage: number) => {
    setPage(newPage);
    setMethode('get');
  };

  const handleEditClick =
    (params: GridRenderCellParams) =>
    (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      params.api.setRowMode(params.row.id, 'edit');
    };
  const handleSaveFile = () => {
    if (addFile !== undefined) {
      uploadFile(addFile, true).then((r) => {
        setOpenAlert(true);
        setMethode('createGet');

        setMessageAlert('Die Datei wurde erfolgreich hochgeladen');
        setSeverity('success');
      });
    } else {
      setOpenAlert(true);
      setMethode('createGet');
      setMessageAlert('Die datei konnte nicht hochgeladen werden');
      setSeverity('error');
    }
  };

  const onCloseFileViewModal = () => {
    setOpenViewFile(false);
  };

  const handleSaveClick = (params: GridRenderCellParams) => {
    return (event: { stopPropagation: () => void }) => {
      const oId = params.row.oId;
      event.stopPropagation();
      params.api.commitRowChange(params.row.id);
      if (methode === 'create') {
        if (addFile !== undefined) {
          uploadFile(addFile, true).then((r) => {
            setMethode('createGet');
            params.api.setRowMode(params.row.id, 'view');
            const id = params.row.id;
            params.api.updateRows([{ id, _action: 'delete' }]);
            setOpenAlert(true);

            setMessageAlert('Die Datei wurde erfolgreich hochgeladen');
            setSeverity('success');
          });
        } else {
          setOpenAlert(true);
          setMethode('create');
          setMessageAlert('Die datei konnte nicht hochgeladen werden');
          setSeverity('error');
        }
      } else {
        let updateFile = upsertFileFormData(postboxId, params);
        if (validateUpsertFile(updateFile)) {
          updateFileMetaData(oId, updateFile as UpdateFileRequest, true).then(
            (r) => {
              setMethode('');
              setOpenAlert(true);
              setMessageAlert('Die Meta Daten wurden erfolgreich geändert');
              setSeverity('success');
            }
          );
        } else {
          setMethode('createGet');
          params.api.setRowMode(params.row.id, 'view');
          params.api.updateRows([{ ...params.row, isNew: false }]);
          setOpenAlert(true);
          setMessageAlert('Die Meta daten konnten nicht geändert werden');
          setSeverity('error');
        }
      }
    };
  };

  const handleDeleteClick =
    (params: GridRenderCellParams) =>
    (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      const id = params.row.id;
      const oId = params.row.oId;
      if (oId !== undefined && oId !== '') {
        deleteFileMetaData(oId).then((r) => {
          setMethode('createGet');
          params.api.updateRows([{ id, _action: 'delete' }]);
          setOpenAlert(true);
          setMessageAlert('Die Datei wurde erfolgreich gelöscht');
          setSeverity('success');
        });
      } else {
        setOpenAlert(true);
        setMethode('');
        setMessageAlert('Die datei konnte leider nicht entfernt werden');
        setSeverity('error');
      }
      setOpenDialog(false);
    };

  const handleCancelClick =
    (params: GridRenderCellParams) =>
    (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      params.api.setRowMode(params.row.id, 'view');
      const id = params.row.id;
      if (params.row!.isNew) {
        params.api.current.updateRows([{ id, _action: 'delete' }]);
      }
    };

  const columnsAction = fileColumns().concat({
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: classes.actions,
    renderCell: (params: GridRenderCellParams) => {
      const isInEditMode = params.api.getRowMode(params.row.id) === 'edit';
      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            onClick={handleSaveClick(params)}
            color="primary"
            disabled={!action}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className={classes.textPrimary}
            onClick={handleCancelClick(params)}
            color="inherit"
            disabled={!action}
          />
        ];
      }
      return [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="View"
          className={classes.textPrimary}
          onClick={handleViewClick(params)}
          color="inherit"
          disabled={action}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className={classes.textPrimary}
          onClick={handleEditClick(params)}
          color="inherit"
          hidden={!action}
          disabled={!action}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleClickOpenDialog(params)}
          color="inherit"
          disabled={!action}
        />
      ];
    }
  });

  const { data: files } = useSWR<ResultsObject<FileModel>>(
    `/postboxes/${postboxId}/file-results?` +
      `page=${page}&size=10&sortBy=CREATED_AT&order=DESC`
  );
  return files ? (
    <>
      {' '}
      <Container>
        <Typography
          component="div"
          className={'program'}
          style={{ overflowY: 'auto' }}
        >
          {action ? (
            <div>
              <br />
              <br />
              <input
                disabled={!action}
                type="file"
                name="file"
                onChange={handleUploadFile}
              />
              <br />
              <Button
                disabled={!action}
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => handleSaveFile()}
              >
                Add eine neue Datei in Gruppe
              </Button>
            </div>
          ) : (
            ''
          )}
          <br />
          <br />
          <Suspense fallback={null}>
            <DataGridRows
              gridRowsProp={fileRowsRenderer(files, methode)}
              gridColumns={columnsAction}
              page={files.page}
              pageSize={files.size}
              total={files.total}
              onChangePage={onChangePage}
            />
          </Suspense>
        </Typography>
        <AlertMessage
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          message={messageAlert}
          severity={severity}
        />
        <DialogMessageRenderer
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          params={params}
          handleDeleteClick={handleDeleteClick}
        />
        {openViewFile && (
          <FileViewModal
            onCloseFileViewModal={onCloseFileViewModal}
            fileId={params?.row.oId}
          />
        )}
      </Container>
    </>
  ) : (
    <>Es ist leider etwas in file action schiefgelaufen</>
  );
}
