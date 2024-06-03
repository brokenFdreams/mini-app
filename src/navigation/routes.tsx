import { ComponentType } from "react";
import { Base } from "../components/base/Base";
import { Counter } from "../components/counter/Counter";
import { Hello } from "../components/hello/Hello";



interface Route {
    path: string;
    Component: ComponentType;
    title: string;
}

export const routes: Route[] = [
    { path: '/', Component: Base, title: 'Base component' },
    { path: '/hello', Component: Hello, title: 'Hello componet' },
    { path: '/counter', Component: Counter, title: 'Counter component' }
];