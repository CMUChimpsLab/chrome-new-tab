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
    shape = _propTypes2.default.shape;


var Chart = (0, _createReactClass2.default)({
    displayName: 'Chart',

    propTypes: {
        height: number.isRequired,
        width: number.isRequired,
        margin: shape({
            top: number,
            bottom: number,
            left: number,
            right: number
        }).isRequired
    },

    render: function render() {
        var _props = this.props,
            width = _props.width,
            height = _props.height,
            margin = _props.margin,
            viewBox = _props.viewBox,
            preserveAspectRatio = _props.preserveAspectRatio,
            children = _props.children;


        return _react2.default.createElement(
            'svg',
            { ref: 'svg', width: width, height: height, viewBox: viewBox, preserveAspectRatio: preserveAspectRatio },
            _react2.default.createElement(
                'g',
                { transform: 'translate(' + margin.left + ', ' + margin.top + ')' },
                children
            )
        );
    }
});

exports.default = Chart;