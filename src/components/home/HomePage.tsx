import { useBackButton, useMainButton } from '@tma.js/sdk-react';
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const HomePage: FC = () => {
    useBackButton().hide();

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
            <input />
        </>
    );
}