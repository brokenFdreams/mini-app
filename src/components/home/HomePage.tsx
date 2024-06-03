import { Cell, List, Section } from '@telegram-apps/telegram-ui';
import { useMainButton } from '@tma.js/sdk-react';
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from '../link/Link';


export const HomePage: FC = () => {
    const mainButton = useMainButton();
    mainButton
        .enable()
        .show()
        .setText('Learn cards');

    const navigator = useNavigate();

    useEffect(() => mainButton.on('click', () => {
        navigator('/learn');
    }), [mainButton]);

    return (
        <>
            <div>Home page</div>
        </>
    );
}