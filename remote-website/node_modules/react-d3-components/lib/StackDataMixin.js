'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var string = _propTypes2.default.string;


var StackDataMixin = {
    propTypes: {
        offset: string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            offset: 'zero',
            order: 'default'
        };
    },
    componentWillMount: function componentWillMount() {
        this._stackData(this.props);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this._stackData(nextProps);
    },
    _stackData: function _stackData(props) {
        var offset = props.offset,
            order = props.order,
            x = props.x,
            y = props.y,
            values = props.values;


        var stack = _d2.default.layout.stack().offset(offset).order(order).x(x).y(y).values(values);

        this._data = stack(this._data);

        for (var m = 0; m < values(this._data[0]).length; m++) {
            var positiveBase = 0;
            var negativeBase = 0;
            for (var n = 0; n < this._data.length; n++) {
                var value = y(values(this._data[n])[m]);
                if (value < 0) {
                    values(this._data[n])[m].y0 = negativeBase;
                    negativeBase += value;
                } else {
                    values(this._data[n])[m].y0 = positiveBase;
                    positiveBase += value;
                }
            }
        }
    }
};

exports.default = StackDataMixin;