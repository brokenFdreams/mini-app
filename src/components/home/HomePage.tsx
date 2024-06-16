import {RequestedContact, useBackButton, useMainButton, useMiniApp} from '@tma.js/sdk-react';
import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const HomePage: FC = () => {
    const backButton = useBackButton();
    const mainButton = useMainButton();
    const navigator = useNavigate();
    const miniApp = useMiniApp();
    const [user, setUser] = useState<RequestedContact>(null);


    useEffect(() => {
        miniApp.requestContact()
            .then((user: RequestedContact) => setUser(user));
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
            <div>User: ${user?.toString()}</div>
            <div>Hash: ${user?.hash}</div>
            <div>AuthDate: ${user?.authDate?.toLocaleDateString()}</div>
            <div>FirstName: ${user?.contact?.firstName}</div>
            <div>LastName: ${user?.contact?.lastName}</div>
            <div>PhoneNumber: ${user?.contact?.phoneNumber}</div>
            <div>UserId: ${user?.contact?.userId}</div>
            <input/>
        </>
    );
}