"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.encodeURL = void 0;
var constants_1 = require("./constants");
/**
 * Encode a Solana Pay URL from required and optional components.
 *
 * @param {EncodeURLComponents} components
 *
 * @param components.recipient
 * @param components.amount
 * @param components.splToken
 * @param components.reference
 * @param components.label
 * @param components.message
 * @param components.memo
 */
function encodeURL(_a) {
    var recipient = _a.recipient, params = __rest(_a, ["recipient"]);
    var url = constants_1.URL_PROTOCOL + encodeURIComponent(recipient.toBase58());
    var encodedParams = encodeURLParams(params);
    if (encodedParams) {
        url += '?' + encodedParams;
    }
    return url;
}
exports.encodeURL = encodeURL;
function encodeURLParams(_a) {
    var amount = _a.amount, splToken = _a.splToken, reference = _a.reference, label = _a.label, message = _a.message, memo = _a.memo;
    var params = [];
    if (amount) {
        params.push(['amount', amount.toFixed(amount.decimalPlaces())]);
    }
    if (splToken) {
        params.push(['spl-token', splToken.toBase58()]);
    }
    if (reference) {
        if (!Array.isArray(reference)) {
            reference = [reference];
        }
        for (var _i = 0, reference_1 = reference; _i < reference_1.length; _i++) {
            var pubkey = reference_1[_i];
            params.push(['reference', pubkey.toBase58()]);
        }
    }
    if (label) {
        params.push(['label', label]);
    }
    if (message) {
        params.push(['message', message]);
    }
    if (memo) {
        params.push(['memo', memo]);
    }
    return params.map(function (_a) {
        var key = _a[0], value = _a[1];
        return "".concat(key, "=").concat(encodeURIComponent(value));
    }).join('&');
}
