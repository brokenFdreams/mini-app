import {SDKProvider} from '@tma.js/sdk-react';
import React, {FC} from 'react';
import {App} from './App';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export const Root: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <SDKProvider>
                <App/>
            </SDKProvider>
        </QueryClientProvider>
    );
}
