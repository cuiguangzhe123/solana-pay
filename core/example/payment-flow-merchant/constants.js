"use strict";
exports.__esModule = true;
exports.CUSTOMER_WALLET = exports.MERCHANT_WALLET = void 0;
var web3_js_1 = require("@solana/web3.js");
exports.MERCHANT_WALLET = new web3_js_1.PublicKey('8CWXyHtucmeZiVexTQCjUXmGc6AywQRa6a6jR86Epcgh');
// Keypair purely for testing purposes. Exists only on devnet
exports.CUSTOMER_WALLET = web3_js_1.Keypair.fromSecretKey(Uint8Array.from([
    169, 48, 146, 127, 191, 185, 98, 158, 130, 159, 205, 137, 2, 146, 85, 1, 93, 107, 98, 90, 245, 69, 40, 39, 220,
    78, 226, 249, 231, 254, 92, 13, 186, 138, 174, 147, 156, 143, 248, 132, 28, 206, 134, 228, 241, 192, 94, 44,
    177, 15, 41, 219, 124, 116, 255, 78, 172, 209, 106, 78, 37, 169, 115, 146,
]));
