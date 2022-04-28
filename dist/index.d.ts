import { ReactNode } from 'react';
declare type NonEmptyArray<T> = [T, ...T[]];
export declare function requiredNodes(nodes: NonEmptyArray<ReactNode> | NonEmptyArray<(...args: any) => JSX.Element>): (props: {
    [key: string]: any;
}, propName: string, componentName: string) => Error | null;
export {};
