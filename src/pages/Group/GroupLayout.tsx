import React from 'react';
import Header from '../../headerFooter/Header';
import GroupTabPanel from './TabPanel/GroupTabPanel';

export function GroupLayout() {
  return (
    <>
      {' '}
      <div className="Acc">
        <Header message={'Herzlich Willkommen zu Hause'} />
        <div
          className="background-image"
          style={{
            backgroundImage: "url('data:image/jpeg;base64')",
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
          <GroupTabPanel />
        </div>
      </div>
    </>
  );
}

export default GroupLayout;
