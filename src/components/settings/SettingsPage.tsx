import {useBackButton, useMainButton } from "@tma.js/sdk-react";
import React, { FC } from "react";


export const SettingsPage: FC = () => {
    useMainButton().hide();
    useBackButton().show();
    return <h1>Settings page</h1>;
}