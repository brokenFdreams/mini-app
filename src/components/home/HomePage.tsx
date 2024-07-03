import {useQuery} from '@tanstack/react-query';
import {useBackButton, useCloudStorage, useLaunchParams, useMainButton} from '@tma.js/sdk-react';
import axios, {AxiosError, AxiosResponse} from 'axios';
import React, {ChangeEvent, ChangeEventHandler, FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const URL = 'https://memorizer-back.loca.lt/';

export const HomePage: FC = () => {
    const backButton = useBackButton();
    const mainButton = useMainButton();
    const navigator = useNavigate();
    const lp = useLaunchParams();
    const [validated, setValidated] = useState<Validated>(new Validated(false));
    const cloudStorage = useCloudStorage();
    const [testCS, setTestCS] = useState<string>(null);
    const [toSaveInCS, setToSaveInCS] = useState<string | null>(null);

    useEffect(() => {
        backButton.hide();
        mainButton
            .enable()
            .show()
            .setText('Learn cards');

        cloudStorage.get('to-save')
            .then((value) => {
                console.log(`Recieved from TCS '${value}'`);
                setTestCS(value);
            });
//        return () => {
//            cloudStorage.delete('to-save')
//            .then(() => console.log('to-save deleted'));
//        }
    }, [])

    useEffect(() => {
        console.log(`Trying to save ${toSaveInCS}`);
        const toSave = toSaveInCS?.toString();

        cloudStorage.set('to-save', toSave)
            .then(() => console.log(`'${toSave}' was saved`));

        cloudStorage.get('to-save')
            .then((value) => {
                console.log(value);
                console.log(value?.toLowerCase());
                console.log(`Recieved from TCS '${value?.toString()}'`);
                setTestCS(value);
            });
    }, [toSaveInCS])

    useQuery({
        queryKey: ['validation'],
        retry: false,
        queryFn: () => axios.post(URL + 'authorize', {
            headers: {
                "Accept": "application/json",
            },
            body: lp.initData
        })
            .then((response: AxiosResponse) => {
                console.log(`Response: ${response.data}`);
                setValidated(response.data);
            })
            .catch((e: AxiosError) => {
                console.error(`Error occured during API call. Status: ${e.response.status} ${e.response.statusText}. Message: ${e.response.data['message']}`)
                throw Error(e.response.data['message']);
            })
    });

    useEffect(() => mainButton.on('click', () => {
        navigator('/learn');
    }), [mainButton]);

    const onChangeHandler: ChangeEventHandler = (event: ChangeEvent<Element>) => {
        console.log(`value: ${event.target.value}`);
        setToSaveInCS(event.target.value);
    }

    return (
        <>
            <div>Home page</div>
            <div>Validated: {validated.validated}</div>
            <input onChange={onChangeHandler}/>
            <div>CloudStorage value: {testCS}</div>
        </>
    );
}

class Validated {
    constructor(readonly validated: boolean) {
    }


}

//const some = (telegramInitData: string) => {
//    console.log(`telegram init data: ${telegramInitData}`)
//    const initData = new URLSearchParams(telegramInitData);
//
//    console.log(`initData: ${JSON.stringify(initData)}`);
//
//    initData.sort();
//
//    const hash = initData.get("hash");
//    initData.delete("hash");
//
//    const dataToCheck = [...initData.entries()].map(([key, value]) => key + "=" + value).join("\n");
//
//    console.log(`dataToCheck: ${dataToCheck}`);
//
//}
