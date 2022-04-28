/** @jest-environment jsdom */

import React from 'react';
import requiredNodes from './index';
import { cleanup, render } from '@testing-library/react';

const consoleErrorMock = jest.spyOn(console, 'error');

const A = ({ a }: { a: string }) => <>{a}</>;
const B = ({ b }: { b: string }) => <>{b}</>;

describe('requiredNodes', () => {
  afterEach(() => {
    console.clear();
    consoleErrorMock.mockClear();
    cleanup();
  });

  test('requiredNodes receive valid node and passed prop-types validation', () => {
    const I = ({ c }: { c: React.ReactNode }) => <>{c}</>;

    I.propTypes = {
      c: requiredNodes([A]),
    };

    render(<I c={<A a="#" />} />);
    expect(consoleErrorMock).toBeCalledTimes(0);
  });

  test('requiredNodes receive several valid nodes and passed prop-types validation', () => {
    const C = ({ c }: { c: React.ReactNode }) => <>{c}</>;

    C.propTypes = {
      c: requiredNodes([A, B]),
    };

    render(
      <>
        <C c={<A a="#" />} />
        <C c={<B b="#" />} />
      </>,
    );
    expect(consoleErrorMock).toBeCalledTimes(0);
  });

  test('requiredNodes passed validation if specify invalid node', () => {
    const D = ({ c }: { c: React.ReactNode }) => <>{c}</>;

    D.propTypes = {
      c: requiredNodes([A]),
    };

    render(<D c={<B b="#" />} />);

    expect(consoleErrorMock).toBeCalledTimes(1);
    expect(consoleErrorMock.mock.calls[0][2]).toBe(
      'Invalid prop `c` supplied to `D`. Validation failed.',
    );
  });

  test('requiredNodes with class component passed validation with valid node', () => {
    class C extends React.Component<any, any> {
      static propTypes: any;

      render() {
        const { c } = this.props;
        return <>{c}</>;
      }
    }

    C.propTypes = {
      c: requiredNodes([A]),
    };

    render(<C c={<A a="#" />} />);

    expect(consoleErrorMock).toBeCalledTimes(0);
  });

  test('requiredNodes with class component not passed validation with invalid node', () => {
    class G extends React.Component<any, any> {
      static propTypes: any;

      render() {
        const { c } = this.props;
        return <>{c}</>;
      }
    }

    G.propTypes = {
      c: requiredNodes([B]),
    };

    render(<G c={<A a="#" />} />);

    expect(consoleErrorMock).toBeCalledTimes(1);
    expect(consoleErrorMock.mock.calls[0][2]).toBe(
      'Invalid prop `c` supplied to `G`. Validation failed.',
    );
  });

  test('requiredNodes receive react classname valid node', () => {
    const F = ({ c }: { c: React.ReactNode }) => <>{c}</>;

    class CmpClass extends React.Component<any, any> {
      render() {
        const { c } = this.props;
        return <>{c}</>;
      }
    }

    F.propTypes = {
      c: requiredNodes([CmpClass]),
    };

    render(<F c={<CmpClass C="#" />} />);
    expect(consoleErrorMock).toBeCalledTimes(0);
  });
});
