import { ReactElement, ReactFragment, ReactPortal, ReactInstance } from 'react';
declare type ReactNode = ReactElement | ReactFragment | ReactPortal;
declare type NonEmptyArray<T> = [T, ...T[]];
export default function requiredNodes(nodes: NonEmptyArray<ReactNode | ReactInstance> | NonEmptyArray<(...args: any) => JSX.Element>): (props: {
    [key: string]: any;
}, propName: string, componentName: string) => Error | null;
export {};
