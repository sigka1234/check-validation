"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forKorean_1 = require("./forKorean");
var _success = { result: true, message: "" };
var _fail = function (message) { return ({ result: false, message: message }); };
var regExps = {
    email: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    number: /^[0-9]*$/i,
    korean: /^[가-힣]*$/i,
    english: /^[a-zA-Z]*$/i,
    englishNumber: /^[a-zA-Z0-9]*$/i,
    phone: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/
};
var messages = function (name, compare, locale) {
    if (compare === void 0) { compare = ""; }
    if (locale === void 0) { locale = "en"; }
    var en = {
        required: name + " is required",
        email: name + " needs email format",
        number: name + " is not number",
        phone: name + " needs phone format",
        korean: name + " is not in Korean",
        english: name + " is not in English",
        englishNumber: name + " is not match in English or Number",
        match: name + " is not match with " + compare,
        min: "The minimum " + name + " is " + compare,
        max: "The maximum " + name + " is " + compare,
        length: name + " must be " + compare + " lengths",
        minLength: name + " must be more than " + compare + " lengths",
        maxLength: name + " must be less than " + compare + " lengths",
    };
    var ko = {
        required: name + " \uC785\uB825 \uBC14\uB78D\uB2C8\uB2E4",
        email: name + " \uD615\uC2DD\uC5D0 \uB9DE\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",
        number: name + " \uC22B\uC790\uAC00 \uC544\uB2D9\uB2C8\uB2E4",
        phone: name + " \uD615\uC2DD\uC5D0 \uB9DE\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",
        korean: name + " \uD55C\uAE00\uB85C \uC785\uB825 \uBC14\uB78D\uB2C8\uB2E4",
        english: name + " \uC601\uC5B4\uB85C \uC785\uB825 \uBC14\uB78D\uB2C8\uB2E4",
        englishNumber: name + " \uC601\uC5B4 \uB610\uB294 \uC22B\uC790\uB85C \uC785\uB825 \uBC14\uB78D\uB2C8\uB2E4",
        match: name + " \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",
        min: name + " \uCD5C\uC18C\uAC12\uC740 " + compare + "\uC785\uB2C8\uB2E4",
        max: name + " \uCD5C\uB300\uAC12\uC740 " + compare + "\uC785\uB2C8\uB2E4",
        length: name + " \uAE00\uC790\uC218\uB294 " + compare + "\uC790\uB9AC\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4",
        minLength: name + " \uAE00\uC790\uC218\uB294 " + compare + "\uC790\uB9AC \uCD08\uACFC\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4",
        maxLength: name + " \uAE00\uC790\uC218\uB294 " + compare + "\uC790\uB9AC \uBBF8\uB9CC\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4",
    };
    return locale === "ko" ? ko : en;
};
var setMessage = function (key, value, ruleValue, locale, korean, compare) {
    if (locale === void 0) { locale = "en"; }
    if (compare === void 0) { compare = ""; }
    if (ruleValue === "required"
        || ruleValue === "email"
        || ruleValue === "number"
        || ruleValue === "phone"
        || ruleValue === "korean"
        || ruleValue === "english"
        || ruleValue === "englishNumber"
        || ruleValue === "match"
        || ruleValue === "min"
        || ruleValue === "max"
        || ruleValue === "length"
        || ruleValue === "minLength"
        || ruleValue === "maxLength") {
        var name_1 = value && value.title ? value.title : key;
        return value[ruleValue] ? value[ruleValue] : (locale === "ko" ? messages(forKorean_1.default(name_1, korean), compare, locale)[ruleValue] : messages(name_1, compare, locale)[ruleValue]);
    }
    else {
        return "Unknown Error";
    }
};
var basicExecute = function (data, key, value, title, ruleValue, locale) {
    if (locale === void 0) { locale = "en"; }
    var result = _success;
    var message = "";
    switch (ruleValue) {
        case "required":
            message = setMessage(key, value, ruleValue, locale, "을");
            result = _required(data, message);
            break;
        case "email":
            message = setMessage(key, value, ruleValue, locale, "이");
            result = _regExp(data, regExps.email, message);
            break;
        case "number":
            message = setMessage(key, value, ruleValue, locale, "을");
            result = _regExp(data, regExps.number, message);
            break;
        case "phone":
            message = setMessage(key, value, ruleValue, locale, "이");
            result = _regExp(data, regExps.phone, message);
            break;
        case "korean":
            message = setMessage(key, value, ruleValue, locale, "을");
            result = _regExp(data, regExps.korean, message);
            break;
        case "english":
            message = setMessage(key, value, ruleValue, locale, "을");
            result = _regExp(data, regExps.english, message);
            break;
        case "englishNumber":
            message = setMessage(key, value, ruleValue, locale, "을");
            result = _regExp(data, regExps.englishNumber, message);
            break;
    }
    return result;
};
var inValueExecute = function (data, key, value, title, ruleValue, locale) {
    if (locale === void 0) { locale = "en"; }
    var result = _success;
    var message = "";
    var getKey = _getKey(ruleValue);
    ruleValue = ruleValue.substr(0, (ruleValue.indexOf('[')));
    switch (ruleValue) {
        case "min":
            message = setMessage(key, value, ruleValue, locale, "이", getKey.key);
            result = _min(data, getKey.key, message);
            break;
        case "max":
            message = setMessage(key, value, ruleValue, locale, "이", getKey.key);
            result = _max(data, getKey.key, message);
            break;
        case "minLength":
            message = setMessage(key, value, ruleValue, locale, "을", getKey.key);
            result = _minLength(data, getKey.key, message);
            break;
        case "maxLength":
            message = setMessage(key, value, ruleValue, locale, "을", getKey.key);
            result = _maxLength(data, getKey.key, message);
            break;
        case "length":
            message = setMessage(key, value, ruleValue, locale, "을", getKey.key);
            result = _length(data, getKey.key, message);
            break;
    }
    return result;
};
var matchExecute = function (data, key, value, title, ruleValue, locale, state) {
    if (locale === void 0) { locale = "en"; }
    var result = _success;
    var message = "";
    var getKey = _getKey(ruleValue);
    ruleValue = ruleValue.substr(0, (ruleValue.indexOf('[')));
    if (getKey.result) {
        message = setMessage(key, value, ruleValue, locale, "이", getKey.key);
        result = _match(data, _checkDepth(state, getKey.key), message);
    }
    else {
        return _fail("you need compare data of " + key);
    }
    return result;
};
var validation = function (state, validations, locale) {
    if (locale === void 0) { locale = "en"; }
    var validate = _success;
    Object.entries(validations).some(function (_a) {
        var key = _a[0], value = _a[1];
        var data = _checkDepth(state, key);
        var rules = typeof value === "string" ? value : value.rules;
        if (!rules) {
            validate = _fail(key + " rule does not exist");
        }
        else {
            var rulesArray = rules.split("|");
            rulesArray.map(function (ruleValue) {
                if (validate.result && (ruleValue === "required"
                    || ruleValue === "email"
                    || ruleValue === "number"
                    || ruleValue === "phone"
                    || ruleValue === "korean"
                    || ruleValue === "english"
                    || ruleValue === "englishNumber")) {
                    validate = basicExecute(data, key, value, value.title, ruleValue, locale);
                }
                if (validate.result && ruleValue.indexOf('match[') >= 0)
                    validate = matchExecute(data, key, value, value.title, ruleValue, locale, state);
                if (validate.result && (ruleValue.indexOf('min[') >= 0
                    || ruleValue.indexOf('max[') >= 0
                    || ruleValue.indexOf('minLength[') >= 0
                    || ruleValue.indexOf('maxLength[') >= 0
                    || ruleValue.indexOf('length[') >= 0)) {
                    validate = inValueExecute(data, key, value, value.title, ruleValue, locale);
                }
                return !validate.result;
            });
        }
        return !validate.result;
    });
    return validate;
};
var _returnData = function (data, message) {
    if (message === void 0) { message = ""; }
    return data ? _success : _fail(message);
};
var _required = function (data, message) { return _returnData(data, message); };
var _regExp = function (data, regExp, message) { return data ? _returnData(regExp.test(data), message) : _success; };
var _match = function (data, matchData, message) { return data ? _returnData(data.toString() === matchData.toString(), message) : _success; };
var _min = function (data, min, message) { return data ? _returnData(Number(data) >= Number(min), message) : _success; };
var _max = function (data, max, message) { return data ? _returnData(Number(data) <= Number(max), message) : _success; };
var _minLength = function (data, min, message) { return data ? _returnData(data.length >= Number(min), message) : _success; };
var _maxLength = function (data, max, message) { return data ? _returnData(data.length <= Number(max), message) : _success; };
var _length = function (data, max, message) { return data ? _returnData(data.length === Number(max), message) : _success; };
var _checkDepth = function (state, str) {
    if (str === void 0) { str = ''; }
    if (str.indexOf('.') >= 0) {
        var array = str.split('.');
        str = str.substring((str.indexOf('.') + 1), str.length);
        return _checkDepth(state[array[0]], str);
    }
    else {
        return state[str];
    }
};
var _getKey = function (value) {
    var leftIndex = value.indexOf('[');
    var rightIndex = value.indexOf(']');
    if (leftIndex > 0 && rightIndex > 0)
        return { result: true, key: value.substring(leftIndex + 1, rightIndex) };
    else
        return { result: false, key: "" };
};
exports.default = validation;
