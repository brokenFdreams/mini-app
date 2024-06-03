import { useMainButton } from "@tma.js/sdk-react";
import React, { FC } from "react";

export const LearnPage: FC = () => {
    useMainButton().hide();

    return (
        <>
            <div>Card to learn</div>
        </>
    );
}