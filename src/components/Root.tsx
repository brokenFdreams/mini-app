import {SDKProvider} from '@tma.js/sdk-react';
import React, {FC} from 'react';
import {App} from './App';


export const Root: FC = () => {
    return (
        <SDKProvider>
            <App />
        </SDKProvider>
    );
}
