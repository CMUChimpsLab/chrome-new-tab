'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var func = _propTypes2.default.func;


var StackAccessorMixin = {
    propTypes: {
        label: func,
        values: func,
        x: func,
        y: func,
        y0: func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            label: function label(stack) {
                return stack.label;
            },
            values: function values(stack) {
                return stack.values;
            },
            x: function x(e) {
                return e.x;
            },
            y: function y(e) {
                return e.y;
            },
            y0: function y0(e) {
                return e.y0;
            }
        };
    }
};

exports.default = StackAccessorMixin;