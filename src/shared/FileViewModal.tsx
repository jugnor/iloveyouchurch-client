import useSWR from 'swr';
import { useUserProperties } from '../hooks/useUserProperties';
import { FileModel } from '../models/File';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
interface FileViewModalProps {
  onCloseFileViewModal: () => void;
  fileId: string;
}

export function FileViewModal({
  onCloseFileViewModal,
  fileId
}: FileViewModalProps) {
  const { currentGroupId } = useUserProperties();

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const { data: fileString } = useSWR<string>(
    `/postboxes/${currentGroupId}/files/${fileId}/view`
  );

  const { data: fileMeta } = useSWR<FileModel>(
    `/postboxes/${currentGroupId}/file-meta-data/${fileId}`
  );

  return fileString && fileMeta ? (
    <Dialog
      TransitionComponent={Transition}
      open
      keepMounted
      onClose={onCloseFileViewModal}
      aria-describedby="alert-dialog-slide-description"
      fullScreen={true}
    >
      {' '}
      <object
        aria-label="view-file"
        data={`data:${fileMeta.mimeType};base64, ${encodeURI(fileString)}`}
        type={fileMeta.mimeType}
        width="100%"
        height="100%"
      />
      <DialogActions>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={onCloseFileViewModal}
        >
          Zurück
        </Button>
      </DialogActions>
    </Dialog>
  ) : (
    <>"Es ist Etwas in File view modal schiefgelaufen"</>
  );
}

export default FileViewModal;
