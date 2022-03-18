"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.parseURL = exports.ParseURLError = void 0;
var web3_js_1 = require("@solana/web3.js");
var bignumber_js_1 = require("bignumber.js");
var constants_1 = require("./constants");
/**
 * Thrown when a URL can't be parsed as a Solana Pay URL.
 */
var ParseURLError = /** @class */ (function (_super) {
    __extends(ParseURLError, _super);
    function ParseURLError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'ParseURLError';
        return _this;
    }
    return ParseURLError;
}(Error));
exports.ParseURLError = ParseURLError;
/**
 * Parse the components of a Solana Pay URL.
 *
 * **Reference** implementation for wallet providers.
 *
 * @param url - A Solana Pay URL
 */
function parseURL(url) {
    if (url.length > 2048)
        throw new ParseURLError('length invalid');
    var _a = new URL(url), protocol = _a.protocol, pathname = _a.pathname, searchParams = _a.searchParams;
    if (protocol !== constants_1.URL_PROTOCOL)
        throw new ParseURLError('protocol invalid');
    if (!pathname)
        throw new ParseURLError('recipient missing');
    var recipient;
    try {
        recipient = new web3_js_1.PublicKey(pathname);
    }
    catch (error) {
        throw new ParseURLError('recipient invalid');
    }
    var amount;
    var amountParam = searchParams.get('amount');
    if (amountParam != null) {
        if (!/^\d+(\.\d+)?$/.test(amountParam))
            throw new ParseURLError('amount invalid');
        amount = new bignumber_js_1["default"](amountParam);
        if (amount.isNaN())
            throw new ParseURLError('amount NaN');
        if (amount.isNegative())
            throw new ParseURLError('amount negative');
    }
    var splToken;
    var splTokenParam = searchParams.get('spl-token');
    if (splTokenParam != null) {
        try {
            splToken = new web3_js_1.PublicKey(splTokenParam);
        }
        catch (error) {
            throw new ParseURLError('token invalid');
        }
    }
    var reference;
    var referenceParam = searchParams.getAll('reference');
    if (referenceParam.length) {
        try {
            reference = referenceParam.map(function (reference) { return new web3_js_1.PublicKey(reference); });
        }
        catch (error) {
            throw new ParseURLError('reference invalid');
        }
    }
    var label = searchParams.get('label') || undefined;
    var message = searchParams.get('message') || undefined;
    var memo = searchParams.get('memo') || undefined;
    return {
        recipient: recipient,
        amount: amount,
        splToken: splToken,
        reference: reference,
        label: label,
        message: message,
        memo: memo
    };
}
exports.parseURL = parseURL;
