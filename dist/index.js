"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore next */
function isStringEq(str1, str2) {
    if (str1.length !== str2.length) {
        return false;
    }
    return str1.indexOf(str2) === 0;
}
function requiredNodes(nodes) {
    return (props, propName, componentName) => {
        if (!nodes.some((node) => isStringEq(props[propName].type.toString(), node.toString()))) {
            return new Error('Invalid prop `' +
                propName +
                '` supplied to' +
                ' `' +
                componentName +
                '`. Validation failed.');
        }
        return null;
    };
}
exports.default = requiredNodes;
