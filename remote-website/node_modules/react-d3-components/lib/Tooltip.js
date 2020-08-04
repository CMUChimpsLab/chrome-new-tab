'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var number = _propTypes2.default.number,
    node = _propTypes2.default.node;


var Tooltip = (0, _createReactClass2.default)({
    displayName: 'Tooltip',

    propTypes: {
        top: number.isRequired,
        left: number.isRequired,
        html: node,
        translate: number
    },

    getDefaultProps: function getDefaultProps() {
        return {
            top: 150,
            left: 100,
            html: '',
            translate: 50
        };
    },
    render: function render() {
        var _props = this.props,
            top = _props.top,
            left = _props.left,
            hidden = _props.hidden,
            html = _props.html,
            translate = _props.translate;


        var style = {
            display: hidden ? 'none' : 'block',
            position: 'fixed',
            top: top,
            left: left,
            transform: 'translate(-' + translate + '%, 0)',
            pointerEvents: 'none'
        };

        return _react2.default.createElement(
            'div',
            { className: 'tooltip', style: style },
            html
        );
    }
});

exports.default = Tooltip;