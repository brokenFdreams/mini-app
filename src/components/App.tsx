import { AppRoot } from '@telegram-apps/telegram-ui';
import { useIntegration } from '@tma.js/react-router-integration';
import { bindMiniAppCSSVars, bindThemeParamsCSSVars, bindViewportCSSVars, initNavigator, useLaunchParams, useMiniApp, useSettingsButton, useThemeParams, useViewport } from '@tma.js/sdk-react';
import React, { useEffect, useMemo, type FC } from 'react';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import { routes } from '../navigation/routes';

export const App: FC = () => {
    const lp = useLaunchParams();
    const miniApp = useMiniApp();
    const themeParams = useThemeParams();
    const viewport = useViewport();

    useEffect(() => {
        return bindMiniAppCSSVars(miniApp, themeParams);
    }, [miniApp, themeParams]);

    useEffect(() => {
        return bindThemeParamsCSSVars(themeParams);
    }, [themeParams]);

    useEffect(() => {
        return viewport && bindViewportCSSVars(viewport);
    }, [viewport]);

    const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
    const [location, reactNavigator] = useIntegration(navigator);

    useEffect(() => {
        navigator.attach();
        return () => navigator.detach();
    }, [navigator])

    const settingsButton = useSettingsButton();
    settingsButton.show();

    useEffect(() => {
        settingsButton.on('click', () => {
            navigator.push('/settings');
        });
    }, [settingsButton]);

    return (
        <AppRoot
            appearance={miniApp.isDark ? 'dark' : 'light'}
            platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
        >
            <Router location={location} navigator={reactNavigator}>
                <Routes>
                    {routes.map((route) => <Route key={route.path} {...route} />)}
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </Router>
        </AppRoot>
    );
};