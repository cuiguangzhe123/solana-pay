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
var src_1 = import("../../src");
var constants_1 = import("./constants");
var establishConnection_1 = import("./establishConnection");
var simulateCheckout_1 = import("./simulateCheckout");
var simulateWalletInteraction_1 = import("./simulateWalletInteraction");
var web3_js_1 = import("@solana/web3.js");

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

function main() {
    return __awaiter(this, void 0, void 0, function () {
        var paymentStatus, connection, _a, label, message, memo, amount, reference, url, signatureInfo, signature, error_1;
        var _this = this;
        return __generator( this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("Let's simulate a Solana Pay flow ... \n");
                    console.log('1. ✅ Establish connection to the cluster');
                    return [4 /*yield*/, (0, establishConnection)()];
                case 1:
                    connection = _b.sent();
                    /**
                     * Simulate a checkout experience
                     *
                     * Recommendation:
                     * `amount` and `reference` should be created in a trusted environment (server).
                     * The `reference` should be unique to a single customer session,
                     * and will be used to find and validate the payment in the future.
                     *
                     * Read our [getting started guide](#getting-started) for more information on the parameters.
                     */
                    console.log('\n2. 🛍 Simulate a customer checkout \n');
                    return [4 /*yield*/, (0, simulateCheckout_1.simulateCheckout)()];
                case 2:
                    _a = _b.sent(), label = _a.label, message = _a.message, memo = _a.memo, amount = _a.amount, reference = _a.reference;
                    /**
                     * Create a payment request link
                     *
                     * Solana Pay uses a standard URL scheme across wallets for native SOL and SPL Token payments.
                     * Several parameters are encoded within the link representing an intent to collect payment from a customer.
                     */
                    console.log('3. 💰 Create a payment request link \n');
                    url = (0, src_1.encodeURL)({ recipient: constants_1.MERCHANT_WALLET, amount: amount, reference: reference, label: label, message: message, memo: memo });
                    /**
                     * Simulate wallet interaction
                     *
                     * This is only for example purposes. This interaction will be handled by a wallet provider
                     */
                    console.log('4. 🔐 Simulate wallet interaction \n');
                    (0, simulateWalletInteraction_1.simulateWalletInteraction)(connection, url);
                    // Update payment status
                    paymentStatus = 'pending';
                    /**
                     * Wait for payment to be confirmed
                     *
                     * When a customer approves the payment request in their wallet, this transaction exists on-chain.
                     * You can use any references encoded into the payment link to find the exact transaction on-chain.
                     * Important to note that we can only find the transaction when it's **confirmed**
                     */
                    console.log('\n5. Find the transaction');
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            /**
                             * Retry until we find the transaction
                             *
                             * If a transaction with the given reference can't be found, the `findTransactionSignature`
                             * function will throw an error. There are a few reasons why this could be a false negative:
                             *
                             * - Transaction is not yet confirmed
                             * - Customer is yet to approve/complete the transaction
                             *
                             * You can implement a polling strategy to query for the transaction periodically.
                             */
                            var interval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                                var error_2;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.count('Checking for transaction...');
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 3, , 4]);
                                            return [4 /*yield*/, (0, src_1.findTransactionSignature)(connection, reference, undefined, 'confirmed')];
                                        case 2:
                                            signatureInfo = _a.sent();
                                            console.log('\n 🖌  Signature found: ', signatureInfo.signature);
                                            clearInterval(interval);
                                            resolve(signatureInfo);
                                            return [3 /*break*/, 4];
                                        case 3:
                                            error_2 = _a.sent();
                                            if (!(error_2 instanceof src_1.FindTransactionSignatureError)) {
                                                console.error(error_2);
                                                clearInterval(interval);
                                                reject(error_2);
                                            }
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); }, 250);
                        })];
                case 3:
                    signature = (_b.sent()).signature;
                    // Update payment status
                    paymentStatus = 'confirmed';
                    /**
                     * Validate transaction
                     *
                     * Once the `findTransactionSignature` function returns a signature,
                     * it confirms that a transaction with reference to this order has been recorded on-chain.
                     *
                     * `validateTransactionSignature` allows you to validate that the transaction signature
                     * found matches the transaction that you expected.
                     */
                    console.log('\n6. 🔗 Validate transaction \n');
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, (0, src_1.validateTransactionSignature)(connection, signature, constants_1.MERCHANT_WALLET, amount, undefined, reference)];
                case 5:
                    _b.sent();
                    // Update payment status
                    paymentStatus = 'validated';
                    console.log('✅ Payment validated');
                    console.log('📦 Ship order to customer');
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _b.sent();
                    console.error('❌ Payment failed', error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
main().then(function () { return process.exit(); }, function (err) {
    console.error(err);
    process.exit(-1);
});
