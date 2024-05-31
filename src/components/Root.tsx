import { useBackButton, useMainButton } from '@tma.js/sdk-react';
import React, { FC, useEffect, useState } from 'react';


export const Root: FC = () => {
    const mainButton = useMainButton();
    const backButton = useBackButton();
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        return mainButton.on('click', () => {
            setCounter((prev) => prev + 1);
            if (!backButton.isVisible) {
                backButton.show();
            }
        });
    }, [mainButton]);

    useEffect(() => {
        return backButton.on('click', () => {
            setCounter((prev) => {
                const nextCounter = prev - 1;
                if (nextCounter <= 0) {
                    backButton.hide();
                    return 0;
                }
                return nextCounter;
            });
        });
    }, [backButton]);

    mainButton
        .setText(`Counter: ${counter}`)
        .enable()
        .show();

    return (
        <>
            <h2>Hello</h2>
            <div>Counter: {counter}</div>
        </>
    );
}
