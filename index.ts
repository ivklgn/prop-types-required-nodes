import { ReactElement, ReactFragment, ReactPortal, ReactInstance } from 'react';

type ReactNode = ReactElement | ReactFragment | ReactPortal;

/* istanbul ignore next */
function isStringEq(str1: string, str2: string) {
  if (str1.length !== str2.length) {
    return false;
  }

  return str1.indexOf(str2) === 0;
}

type NonEmptyArray<T> = [T, ...T[]];

export default function requiredNodes(
  nodes:
    | NonEmptyArray<ReactNode | ReactInstance>
    | NonEmptyArray<(...args: any) => JSX.Element>,
) {
  return (props: { [key: string]: any }, propName: string, componentName: string) => {
    if (
      !nodes.some((node) => isStringEq(props[propName].type.toString(), node!.toString()))
    ) {
      return new Error(
        'Invalid prop `' +
          propName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Validation failed.',
      );
    }
    return null;
  };
}
