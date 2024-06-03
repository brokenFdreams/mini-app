import { useBackButton, useMainButton } from "@tma.js/sdk-react";
import React, { FC, useEffect, useState } from "react";

export const Counter: FC = () => {
    const [counter, setCounter] = useState(0);

    const mainButton = useMainButton();
    const backButton = useBackButton();

    useEffect(() => mainButton.on('click', () => {
        setCounter((prev) => prev + 1);
        backButton.show();
    }), [mainButton]);

    useEffect(() => backButton.on('click', () => {
        setCounter((prev) => {
            const newCounter = prev - 1;
            if (newCounter <= 0) {
                backButton.hide();
                return 0;
            }
            return newCounter;
        })
    }), [backButton]);

    mainButton
        .enable()
        .show()
        .setText(`Counter: ${counter}`);

    return (
        <>
            <h2>Hello</h2>
            <div>Counter: {counter}</div>
        </>
    );
}