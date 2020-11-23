"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forKorean = function (text, type) {
    var checkEnd = _checkEnd(text);
    if (type === "이" || type === "가") {
        return checkEnd ? text + "\uC774" : text + "\uAC00";
    }
    else if (type === "을" || type === "를") {
        return checkEnd ? text + "\uC744" : text + "\uB97C";
    }
    else {
        return "";
    }
};
var _checkEnd = function (text) {
    var lastLetter = text[text.length - 1];
    var uni = lastLetter.charCodeAt(0);
    if (uni < 44032 || uni > 55203)
        return null;
    return (uni - 44032) % 28 != 0;
};
exports.default = forKorean;
