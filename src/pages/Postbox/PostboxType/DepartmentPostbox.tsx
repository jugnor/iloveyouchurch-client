import React from 'react';
import Header from '../../../headerFooter/Header';
import HeaderMessage from '../../../headerFooter/HeaderMessage';
import DepartmentTabPanel from '../TabPanel/DepartmentTabPanel';
import { useUserProperties } from '../../../hooks/useUserProperties';
import useSWR from 'swr';

export function DepartmentPostbox() {
  const { currentPostboxId } = useUserProperties();
  const description = 'BG';
  const { data: fileString } = useSWR<string>(
    `/postboxes/${currentPostboxId}/files-description/${description}?mimeType=image`
  );

  let imageUri: string = '';
  if (fileString !== undefined) {
    imageUri = encodeURI(fileString);
  }

  return (
    <>
      {' '}
      <div className="Acc">
        <Header message={'Herzlich Willkommen zu Hause'} />
        <div
          className="background-image"
          style={{
            backgroundImage: "url('data:image/jpeg;base64," + imageUri + "')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '110vh',
            overflowX: 'auto',
            overflowY: 'auto',
            position: 'absolute'
          }}
        >
          <DepartmentTabPanel />
        </div>
      </div>
    </>
  );
}

export default DepartmentPostbox;
