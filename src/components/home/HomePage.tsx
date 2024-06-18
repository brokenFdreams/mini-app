import {useQuery} from '@tanstack/react-query';
import {useBackButton, useLaunchParams, useMainButton} from '@tma.js/sdk-react';
import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const URL = 'https://memorizer-back.loca.lt/';

export const HomePage: FC = () => {
    const backButton = useBackButton();
    const mainButton = useMainButton();
    const navigator = useNavigate();
    const lp = useLaunchParams();
    const [validated, setValidated] = useState<Validated>(new Validated(false));

    useEffect(() => {
//        some(lp.initDataRaw);
        backButton.hide();
        mainButton
            .enable()
            .show()
            .setText('Learn cards');
    }, [])

    useQuery({
        queryKey: ['validation'],
        retry: false,
        queryFn: () => fetch(URL + 'authorize', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'TelegramInitData': JSON.stringify(lp.initData)
                }
            }
        ).then((response) => {
            return response.json();
        }).then((validated) => {
            console.log(`Response: ${validated}`);
            setValidated(validated);
            return validated;
        }).catch((err) => {
            console.error(`Error occured during API call. Status: ${err.response.status} ${err.response.statusText}. Message: ${err.response.data['message']}`);
            throw Error(err.response.data['message']);
        })
//            axios.get(URL + 'authorize', {
//            headers: {
//                "Accept": "application/json",
//                "TelegramInitData": JSON.stringify(lp.initData)
//            },
//        })
//            .then((response: AxiosResponse) => {
//                console.log(`Response: ${response.data}`);
//                setValidated(response.data);
//            })
//            .catch((e: AxiosError) => {
//                console.error(`Error occured during API call. Status: ${e.response.status} ${e.response.statusText}. Message: ${e.response.data['message']}`)
//                throw Error(e.response.data['message']);
//            })
    });

    useEffect(() => mainButton.on('click', () => {
        navigator('/learn');
    }), [mainButton]);

    return (
        <>
            <div>Home page</div>
            <div>Validated: {validated.validated}</div>
            <input/>
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
