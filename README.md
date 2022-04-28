# prop-types-required-nodes ⛔️

**Prop-types helper for strict runtime checking React nodes.**

This library relevant for React developers who used prop-types or developers who build UI-kits.

- 🐣 **small** API and size
- 🌊 **pipable**
- 🙌🏻 **usefull** access to data/selector in predicates
- 🔗 **better types** than in analogues

## Idea

if you have some component that accepts other ReactNode components via props, for example:

```tsx
interface ButtonProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function Button({ icon, children }: ButtonProps) {
  return (
    <div>
      {icon}
      {children}
    </div>
  );
}
```

in this case **icon** can be **any ReactNode** and it's normal situation. But sometimes we would like specify in props concrete ReactNode.

Let's consider next code:

```tsx
interface IconProps {
  src: string;
}

export function Icon({ src }: IconProps) {
  return <>{src} </>;
}

interface ButtonProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function Button({ icon, children }: ButtonProps) {
  return (
    <div>
      {icon}
      {children}
    </div>
  );
}

// usage:
<Button icon={<Icon src="*" />}>My Button</Button>;
```

In my idea i want to allow receive in **icon** prop only `<Icon />` component and nothing more.

```tsx
// Valid case:
<Button icon={<Icon src="*" />}>My Button</Button>

// Possible case, but not in my opinion:
<Button icon={<span>*</span>}>My Button</Button>
```

By static types we can't effective infer ReactNode, **but we can do it in runtime.**

Inside `prop-types-required-nodes` using prop-types customProp:

```js
MyComponent.propTypes = {
  customProp: function (props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' +
          propName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Validation failed.',
      );
    }
  },
};
```

finally for strict checking nodes we can engage it!

## Usage

```tsx
import requiredNodes from 'prop-types-required-nodes';

interface IconProps {
  src: string;
}

export function Icon({ src }: IconProps) {
  return <>{src} </>;
}

interface ButtonProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function Button({ icon, children }: ButtonProps) {
  return (
    <div>
      {icon}
      {children}
    </div>
  );
}

Button.propTypes = {
  icon: requiredNodes([Icon]),
  children: PropTypes.node,
};

// console.error: Warning: Failed prop type: Invalid prop `icon` supplied to `Icon`. Validation failed.
<Button icon={<span>*</span>}>My Button</Button>;
```

Also you can pass to `requiredNodes` several nodes:

```tsx
import SvgIcon from '@mui/material/SvgIcon';
import Icon from '@ant-design/icons';

import MessageSvg from 'path/to/message.svg';

Button.propTypes = {
  icon: requiredNodes([Icon, SvgIcon]),
  children: PropTypes.node,
};

// console.error: Warning: Failed prop type: Invalid prop `icon` supplied to `Icon`. Validation failed.
<Button icon={<span>*</span>}>My Button</Button>;

// no errors:
<Button icon={<Icon component={MessageSvg} />}>My Button</Button>;

// no errors:
<Button icon={<SvgIcon component={MessageSvg} viewBox="0 0 600 476.6" />}>
  My Button
</Button>;
```

## Installation

**Make sure you have installed [prop-types](https://www.npmjs.com/package/prop-types)**

NPM

```shell
npm install prop-types-required-nodes --save-dev
```

Yarn

```shell
yarn add prop-types-required-nodes -D
```

## Example

[Codesandbox](https://codesandbox.io/s/elegant-chandrasekhar-18wcjq)

## Contributing

Your feedback and contributions are welcome. If you have a suggestion, please raise an issue. Prior to that, please search through the issues first in case your suggestion has been made already. If you decide to work on an issue, or feel like taking initiative and contributing anything at all, feel free to create a pull request and I will get back to you shortly.
