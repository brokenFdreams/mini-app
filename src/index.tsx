import ReactDOM from 'react-dom/client';

import '@telegram-apps/telegram-ui/dist/styles.css';
import { SDKProvider } from '@tma.js/sdk-react';
import React from 'react';
import { Root } from './components/Root';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<SDKProvider><Root/></SDKProvider>);
