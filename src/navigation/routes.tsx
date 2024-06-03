import { ComponentType } from "react";
import { HomePage } from "../components/home/HomePage";
import { LearnPage } from "../components/learn/LearnPage";
import { SettingsPage } from "../components/settings/SettingsPage";

interface Route {
    path: string;
    Component: ComponentType;
    title: string;
}

export const routes: Route[] = [
    { path: '/', Component: HomePage, title: 'Home page' },
    { path: '/learn', Component: LearnPage, title: 'Learn page' },
    { path: '/settings', Component: SettingsPage, title: 'Settings page' }
];
