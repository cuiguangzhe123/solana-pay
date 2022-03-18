"use strict";
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
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var src_1 = require("../src");
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var cluster, endpoint, connection, originalReference, NATIVE_URL, USDC_URL, originalURL, _a, recipient, amount, splToken, reference, label, message, memo, encodedURL, wallet, airdrop, transaction, _b, rawTransaction, signature, result, found, response;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    cluster = 'devnet';
                    endpoint = (0, web3_js_1.clusterApiUrl)(cluster);
                    connection = new web3_js_1.Connection(endpoint, 'confirmed');
                    originalReference = web3_js_1.Keypair.generate().publicKey;
                    NATIVE_URL = 'solana:mvines9iiHiQTysrwkJjGf2gb9Ex9jXJX8ns3qwf2kN' +
                        '?amount=0.01' +
                        '&reference=' +
                        encodeURIComponent(String(originalReference)) +
                        '&label=Michael' +
                        '&message=Thanks%20for%20all%20the%20fish' +
                        '&memo=OrderId5678';
                    USDC_URL = 'solana:mvines9iiHiQTysrwkJjGf2gb9Ex9jXJX8ns3qwf2kN' +
                        '?amount=0.01' +
                        '&spl-token=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' +
                        '&reference=' +
                        encodeURIComponent(String(originalReference)) +
                        '&label=Michael' +
                        '&message=Thanks%20for%20all%20the%20fish' +
                        '&memo=OrderId5678';
                    originalURL = NATIVE_URL;
                    console.log(originalURL);
                    _a = (0, src_1.parseURL)(originalURL), recipient = _a.recipient, amount = _a.amount, splToken = _a.splToken, reference = _a.reference, label = _a.label, message = _a.message, memo = _a.memo;
                    encodedURL = (0, src_1.encodeURL)({ recipient: recipient, amount: amount, splToken: splToken, reference: reference, label: label, message: message, memo: memo });
                    console.log(originalURL);
                    console.log(encodedURL);
                    wallet = web3_js_1.Keypair.generate();
                    return [4 /*yield*/, connection.requestAirdrop(wallet.publicKey, web3_js_1.LAMPORTS_PER_SOL)];
                case 1:
                    airdrop = _c.sent();
                    return [4 /*yield*/, connection.confirmTransaction(airdrop, 'confirmed')];
                case 2:
                    _c.sent();
                    if (!splToken) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, spl_token_1.createAssociatedTokenAccount)(connection, wallet, splToken, wallet.publicKey, { commitment: 'confirmed' })];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4: return [4 /*yield*/, (0, src_1.createTransaction)(connection, wallet.publicKey, recipient, amount, {
                        splToken: splToken,
                        reference: reference,
                        memo: memo
                    })];
                case 5:
                    transaction = _c.sent();
                    // Sign and send the transaction
                    transaction.feePayer = wallet.publicKey;
                    _b = transaction;
                    return [4 /*yield*/, connection.getRecentBlockhash()];
                case 6:
                    _b.recentBlockhash = (_c.sent()).blockhash;
                    transaction.sign(wallet);
                    rawTransaction = transaction.serialize();
                    return [4 /*yield*/, connection.sendRawTransaction(rawTransaction)];
                case 7:
                    signature = _c.sent();
                    return [4 /*yield*/, connection.confirmTransaction(signature, 'confirmed')];
                case 8:
                    result = _c.sent();
                    console.log(result);
                    return [4 /*yield*/, (0, src_1.findTransactionSignature)(connection, originalReference)];
                case 9:
                    found = _c.sent();
                    // Matches the signature of the transaction
                    console.log(found.signature);
                    // Contains the memo provided, prefixed with its length: `[11] OrderId5678`
                    console.log(found.memo);
                    return [4 /*yield*/, (0, src_1.validateTransactionSignature)(connection, found.signature, recipient, amount, splToken, reference)];
                case 10:
                    response = _c.sent();
                    return [2 /*return*/];
            }
        });
    });
})();
