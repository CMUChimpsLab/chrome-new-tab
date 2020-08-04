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

var string = _propTypes2.default.string,
    array = _propTypes2.default.array;


var Path = (0, _createReactClass2.default)({
    displayName: 'Path',

    propTypes: {
        className: string,
        stroke: string.isRequired,
        strokeLinecap: string,
        strokeWidth: string,
        strokeDasharray: string,
        fill: string,
        d: string.isRequired,
        data: array.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return {
            className: 'path',
            fill: 'none',
            strokeWidth: '2',
            strokeLinecap: 'butt',
            strokeDasharray: 'none'
        };
    },
    render: function render() {
        var _props = this.props,
            className = _props.className,
            stroke = _props.stroke,
            strokeWidth = _props.strokeWidth,
            strokeLinecap = _props.strokeLinecap,
            strokeDasharray = _props.strokeDasharray,
            fill = _props.fill,
            d = _props.d,
            style = _props.style,
            data = _props.data,
            onMouseEnter = _props.onMouseEnter,
            _onMouseLeave = _props.onMouseLeave;


        return _react2.default.createElement('path', {
            className: className,
            stroke: stroke,
            strokeWidth: strokeWidth,
            strokeLinecap: strokeLinecap,
            strokeDasharray: strokeDasharray,
            fill: fill,
            d: d,
            onMouseMove: function onMouseMove(evt) {
                return onMouseEnter(evt, data);
            },
            onMouseLeave: function onMouseLeave(evt) {
                return _onMouseLeave(evt);
            },
            style: style
        });
    }
});

exports.default = Path;