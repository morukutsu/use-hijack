"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHijack = exports.Hijack = void 0;

var _react = _interopRequireWildcard(require("react"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _fields = require("./fields");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var HijackContext = (0, _react.createContext)();

var sortTextFunc = function sortTextFunc(a, b) {
  if (a < b) return -1;else if (a > b) return 1;else return 0;
}; // Instantiates a debug input field for a variable
// Will output a debug field matching the variable type


var createInputField = function createInputField(variable, index) {
  var type = _typeof(variable.value);

  switch (type) {
    case "number":
      return (0, _fields.numberInputField)(variable.name, variable.value, variable.setter, index);

    case "string":
      return (0, _fields.textInputField)(variable.name, variable.value, variable.setter, index);

    case "boolean":
      return (0, _fields.boolInputField)(variable.name, variable.value, variable.setter, index);

    default:
      return _react["default"].createElement("div", {
        key: index
      });
  }
};

var Hijack = function Hijack(_ref) {
  var children = _ref.children;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      debugFields = _useState2[0],
      setDebugFields = _useState2[1]; // Sort fields by variable name


  var fields = Object.keys(debugFields).map(function (fieldId) {
    return debugFields[fieldId];
  });
  fields = fields.sort(function (a, b) {
    return sortTextFunc(a.name, b.name);
  });
  var renderedFields = fields.map(function (variable, index) {
    return createInputField(variable, index);
  });
  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    style: styles.container
  }, renderedFields), _react["default"].createElement(HijackContext.Provider, {
    value: [setDebugFields]
  }, children));
};

exports.Hijack = Hijack;
var styles = {
  container: {
    position: "absolute"
  }
};

var shallowClone = function shallowClone(object) {
  return _objectSpread({}, object);
};

var useHijack = function useHijack(variable, setter) {
  var _useContext = (0, _react.useContext)(HijackContext),
      _useContext2 = _slicedToArray(_useContext, 1),
      setDebugFields = _useContext2[0];

  var name = Object.keys(variable)[0];
  var value = variable[name];
  (0, _react.useEffect)(function () {
    var id = (0, _v["default"])();
    setDebugFields(function (prev) {
      var fields = shallowClone(prev);
      fields[id] = {
        id: id,
        name: name,
        value: value,
        setter: setter
      };
      return fields;
    });
    return function () {
      setDebugFields(function (prev) {
        var fields = shallowClone(prev);
        delete fields[id];
        return fields;
      });
    };
  }, [name, value, setter, setDebugFields]);
};

exports.useHijack = useHijack;