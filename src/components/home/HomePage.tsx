import { useBackButton, useMainButton } from '@tma.js/sdk-react';
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const HomePage: FC = () => {
    const backButton = useBackButton();
    const mainButton = useMainButton();
    const navigator = useNavigate();

    useEffect(() => {
        backButton.hide();
        mainButton
            .enable()
            .show()
            .setText('Learn cards');
    }, [])

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