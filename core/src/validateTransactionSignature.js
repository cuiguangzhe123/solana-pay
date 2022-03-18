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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.validateTransactionSignature = exports.ValidateTransactionSignatureError = void 0;
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var bignumber_js_1 = require("bignumber.js");
/**
 * Thrown when a transaction doesn't contain a valid Solana Pay transfer.
 */
var ValidateTransactionSignatureError = /** @class */ (function (_super) {
    __extends(ValidateTransactionSignatureError, _super);
    function ValidateTransactionSignatureError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'ValidateTransactionSignatureError';
        return _this;
    }
    return ValidateTransactionSignatureError;
}(Error));
exports.ValidateTransactionSignatureError = ValidateTransactionSignatureError;
/**
 * Validate that a given transaction signature corresponds with a transaction containing a valid Solana Pay transfer.
 *
 * @param connection - A connection to the cluster.
 * @param signature -  The signature to validate.
 * @param recipient - `recipient` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#recipient)
 * @param amount - `amount` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#amount)
 * @param splToken - `splToken` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#spl-token)
 * @param reference -`reference` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#reference)
 * @param {Finality} finality - A subset of Commitment levels, which are at least optimistically confirmed
 */
function validateTransactionSignature(connection, signature, recipient, amount, splToken, reference, finality) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var response, preAmount, postAmount, accountIndex, recipientATA_1, accountIndex_1, preBalance, postBalance, _loop_1, _i, reference_1, pubkey;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, connection.getTransaction(signature, { commitment: finality })];
                case 1:
                    response = _c.sent();
                    if (!response)
                        throw new ValidateTransactionSignatureError('not found');
                    if (!response.meta)
                        throw new ValidateTransactionSignatureError('missing meta');
                    if (response.meta.err)
                        throw response.meta.err;
                    if (!!splToken) return [3 /*break*/, 2];
                    accountIndex = response.transaction.message.accountKeys.findIndex(function (pubkey) { return pubkey.equals(recipient); });
                    if (accountIndex === -1)
                        throw new ValidateTransactionSignatureError('recipient not found');
                    preAmount = new bignumber_js_1["default"](response.meta.preBalances[accountIndex]).div(web3_js_1.LAMPORTS_PER_SOL);
                    postAmount = new bignumber_js_1["default"](response.meta.postBalances[accountIndex]).div(web3_js_1.LAMPORTS_PER_SOL);
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, (0, spl_token_1.getAssociatedTokenAddress)(splToken, recipient)];
                case 3:
                    recipientATA_1 = _c.sent();
                    accountIndex_1 = response.transaction.message.accountKeys.findIndex(function (pubkey) {
                        return pubkey.equals(recipientATA_1);
                    });
                    if (accountIndex_1 === -1)
                        throw new ValidateTransactionSignatureError('recipient not found');
                    preBalance = (_a = response.meta.preTokenBalances) === null || _a === void 0 ? void 0 : _a.find(function (x) { return x.accountIndex === accountIndex_1; });
                    postBalance = (_b = response.meta.postTokenBalances) === null || _b === void 0 ? void 0 : _b.find(function (x) { return x.accountIndex === accountIndex_1; });
                    preAmount = new bignumber_js_1["default"]((preBalance === null || preBalance === void 0 ? void 0 : preBalance.uiTokenAmount.uiAmountString) || 0);
                    postAmount = new bignumber_js_1["default"]((postBalance === null || postBalance === void 0 ? void 0 : postBalance.uiTokenAmount.uiAmountString) || 0);
                    _c.label = 4;
                case 4:
                    if (postAmount.minus(preAmount).lt(amount))
                        throw new ValidateTransactionSignatureError('amount not transferred');
                    if (reference) {
                        if (!Array.isArray(reference)) {
                            reference = [reference];
                        }
                        _loop_1 = function (pubkey) {
                            if (!response.transaction.message.accountKeys.some(function (accountKey) { return accountKey.equals(pubkey); }))
                                throw new ValidateTransactionSignatureError('reference not found');
                        };
                        for (_i = 0, reference_1 = reference; _i < reference_1.length; _i++) {
                            pubkey = reference_1[_i];
                            _loop_1(pubkey);
                        }
                    }
                    return [2 /*return*/, response];
            }
        });
    });
}
exports.validateTransactionSignature = validateTransactionSignature;
