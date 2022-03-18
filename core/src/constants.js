"use strict";
exports.__esModule = true;
exports.TEN = exports.SOL_DECIMALS = exports.MEMO_PROGRAM_ID = exports.URL_PROTOCOL = void 0;
var web3_js_1 = require("@solana/web3.js");
var bignumber_js_1 = require("bignumber.js");
/** @internal */
exports.URL_PROTOCOL = 'solana:';
/** @internal */
exports.MEMO_PROGRAM_ID = new web3_js_1.PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');
/** @internal */
exports.SOL_DECIMALS = 9;
/** @internal */
exports.TEN = new bignumber_js_1["default"](10);
