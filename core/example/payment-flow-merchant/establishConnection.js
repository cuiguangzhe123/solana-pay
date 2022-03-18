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
exports.simulateCheckout = exports.establishConnection = exports.MERCHANT_WALLET = void 0;
var web3_js_1 = require("@solana/web3.js");
var web3_js_2 = require("@solana/web3.js");
var bignumber_js_1 = require("bignumber.js");
var src_1 = require("../../src");
exports.MERCHANT_WALLET = new web3_js_2.PublicKey('8CWXyHtucmeZiVexTQCjUXmGc6AywQRa6a6jR86Epcgh');
/**
 * Establish a connection to the cluster
 */
function establishConnection(cluster) {
    if (cluster === void 0) { cluster = 'devnet'; }
    return __awaiter(this, void 0, void 0, function () {
        var endpoint, connection, version;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    endpoint = (0, web3_js_1.clusterApiUrl)(cluster);
                    connection = new web3_js_1.Connection(endpoint, 'confirmed');
                    return [4 /*yield*/, connection.getVersion()];
                case 1:
                    version = _a.sent();
                    console.log('Connection to cluster established:', endpoint, version);
                    return [2 /*return*/, connection];
            }
        });
    });
}
exports.establishConnection = establishConnection;
function simulateCheckout() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, {
                    label: 'Yummy Future',
                    message: 'Your Order',
                    memo: 'YF#4098',
                    amount: new bignumber_js_1["default"](0.001),
                    reference: new web3_js_2.Keypair().publicKey
                }];
        });
    });
}
exports.simulateCheckout = simulateCheckout;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var paymentStatus, connection, _a, label, message, memo, amount, reference, url;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("Let's simulate a Solana Pay flow ... \n");
                    console.log('1. ✅ Establish connection to the cluster');
                    return [4 /*yield*/, establishConnection()];
                case 1:
                    connection = _b.sent();
                    console.log('\n2. 🛍 Simulate a customer checkout \n');
                    return [4 /*yield*/, simulateCheckout()];
                case 2:
                    _a = _b.sent(), label = _a.label, message = _a.message, memo = _a.memo, amount = _a.amount, reference = _a.reference;
                    console.log('3. 💰 Create a payment request link \n');
                    url = (0, src_1.encodeURL)({ recipient: exports.MERCHANT_WALLET, amount: amount, reference: reference, label: label, message: message, memo: memo });
                    console.log('4. ' + url + '\n');
                    return [2 /*return*/];
            }
        });
    });
}
main().then(function () { return process.exit(); }, function (err) {
    console.error(err);
    process.exit(-1);
});
