import React from 'react';

import Header from '../../../headerFooter/Header';
import SystemTabPanel from '../TabPanel/SystemTabPanel';

function SystemPostbox() {
  return (
    <>
      {' '}
      <div className="Acc">
        <Header message={'Willkommen zur System Verwaltung'} />
        <div
          className="background-image"
          style={{
            backgroundImage: '',
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
          <SystemTabPanel />
        </div>
      </div>
    </>
  );
}

export default SystemPostbox;
