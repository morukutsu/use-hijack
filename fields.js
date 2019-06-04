"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boolInputField = exports.numberInputField = exports.textInputField = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

// Generic input field for typing text or numbers
var textInputField = function textInputField(name, value, setter, id) {
  return _react["default"].createElement("div", {
    style: styles.container,
    key: id
  }, _react["default"].createElement("span", {
    style: styles.label
  }, name), _react["default"].createElement("input", {
    style: styles.textInput,
    type: "text",
    value: value,
    onChange: function onChange(e) {
      return setter(e.target.value);
    }
  }));
};

exports.textInputField = textInputField;

var numberInputField = function numberInputField(name, value, setter, id) {
  var converter = function converter(modifiedValue) {
    if (modifiedValue === "") modifiedValue = 0;
    modifiedValue = parseFloat(modifiedValue);
    if (isNaN(modifiedValue)) modifiedValue = value;
    setter(modifiedValue);
  };

  return textInputField(name, value, converter, id);
};

exports.numberInputField = numberInputField;

var boolInputField = function boolInputField(name, value, setter, id) {
  return _react["default"].createElement("div", {
    style: styles.container,
    key: id
  }, _react["default"].createElement("span", {
    style: styles.label
  }, name), _react["default"].createElement("input", {
    style: styles.checkbox,
    type: "checkbox",
    checked: value,
    onChange: function onChange(e) {
      return setter(e.target.checked);
    }
  }));
};

exports.boolInputField = boolInputField;
var styles = {
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    height: "2.5em",
    lineHeight: "2.5em",
    borderRadius: "0.2em",
    padding: "0px 2px 2px 2px",
    margin: "2px"
  },
  textInput: {
    border: "1px solid rgba(34,36,38,.15)",
    borderRadius: ".28571429rem",
    padding: ".67857143em 1em",
    color: "rgba(0,0,0,.95)",
    width: "100px",
    height: "0.8em"
  },
  checkbox: {
    height: "1.5em",
    width: "1.5em"
  },
  label: {
    color: "rgba(0,0,0,.87)",
    display: "inline-block",
    width: "6em",
    fontWeight: "300"
  }
};