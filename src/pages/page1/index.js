import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from '@/main/main1';

import '@styles/margin-padding.scss'
import '@styles/common.scss'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
