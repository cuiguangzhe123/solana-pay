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
exports.createTransaction = exports.CreateTransactionError = void 0;
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var bignumber_js_1 = require("bignumber.js");
var constants_1 = require("./constants");
/**
 * Thrown when a valid transaction can't be created from the inputs provided.
 */
var CreateTransactionError = /** @class */ (function (_super) {
    __extends(CreateTransactionError, _super);
    function CreateTransactionError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'CreateTransactionError';
        return _this;
    }
    return CreateTransactionError;
}(Error));
exports.CreateTransactionError = CreateTransactionError;
/**
 * Create a Solana Pay transaction.
 *
 * **Reference** implementation for wallet providers.
 *
 * @param connection - A connection to the cluster.
 * @param payer - `PublicKey` of the payer.
 * @param recipient - `recipient` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#recipient)
 * @param amount - `amount` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#amount)
 * @param {CreateTransactionParams} createTransactionParams - Additional parameters
 * @param createTransactionParams.splToken
 * @param createTransactionParams.reference
 * @param createTransactionParams.memo
 */
function createTransaction(connection, payer, recipient, amount, _a) {
    var _b = _a === void 0 ? {} : _a, splToken = _b.splToken, reference = _b.reference, memo = _b.memo;
    return __awaiter(this, void 0, void 0, function () {
        var payerInfo, recipientInfo, instruction, lamports, mint, payerATA, payerAccount, recipientATA, recipientAccount, tokens, _i, reference_1, pubkey, transaction;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, connection.getAccountInfo(payer)];
                case 1:
                    payerInfo = _c.sent();
                    if (!payerInfo)
                        throw new CreateTransactionError('payer not found');
                    return [4 /*yield*/, connection.getAccountInfo(recipient)];
                case 2:
                    recipientInfo = _c.sent();
                    if (!recipientInfo)
                        throw new CreateTransactionError('recipient not found');
                    if (!!splToken) return [3 /*break*/, 3];
                    // Check that the payer and recipient are valid native accounts
                    if (!payerInfo.owner.equals(web3_js_1.SystemProgram.programId))
                        throw new CreateTransactionError('payer owner invalid');
                    if (payerInfo.executable)
                        throw new CreateTransactionError('payer executable');
                    if (!recipientInfo.owner.equals(web3_js_1.SystemProgram.programId))
                        throw new CreateTransactionError('recipient owner invalid');
                    if (recipientInfo.executable)
                        throw new CreateTransactionError('recipient executable');
                    // Check that the amount provided doesn't have greater precision than SOL
                    if (amount.decimalPlaces() > constants_1.SOL_DECIMALS)
                        throw new CreateTransactionError('amount decimals invalid');
                    // Convert input decimal amount to integer lamports
                    amount = amount.times(web3_js_1.LAMPORTS_PER_SOL).integerValue(bignumber_js_1["default"].ROUND_FLOOR);
                    lamports = amount.toNumber();
                    if (lamports > payerInfo.lamports)
                        throw new CreateTransactionError('insufficient funds');
                    // Create an instruction to transfer native SOL
                    instruction = web3_js_1.SystemProgram.transfer({
                        fromPubkey: payer,
                        toPubkey: recipient,
                        lamports: lamports
                    });
                    return [3 /*break*/, 9];
                case 3: return [4 /*yield*/, (0, spl_token_1.getMint)(connection, splToken)];
                case 4:
                    mint = _c.sent();
                    if (!mint.isInitialized)
                        throw new CreateTransactionError('mint not initialized');
                    // Check that the amount provided doesn't have greater precision than the mint
                    if (amount.decimalPlaces() > mint.decimals)
                        throw new CreateTransactionError('amount decimals invalid');
                    // Convert input decimal amount to integer tokens according to the mint decimals
                    amount = amount.times(constants_1.TEN.pow(mint.decimals)).integerValue(bignumber_js_1["default"].ROUND_FLOOR);
                    return [4 /*yield*/, (0, spl_token_1.getAssociatedTokenAddress)(splToken, payer)];
                case 5:
                    payerATA = _c.sent();
                    return [4 /*yield*/, (0, spl_token_1.getAccount)(connection, payerATA)];
                case 6:
                    payerAccount = _c.sent();
                    if (!payerAccount.isInitialized)
                        throw new CreateTransactionError('payer not initialized');
                    if (payerAccount.isFrozen)
                        throw new CreateTransactionError('payer frozen');
                    return [4 /*yield*/, (0, spl_token_1.getAssociatedTokenAddress)(splToken, recipient)];
                case 7:
                    recipientATA = _c.sent();
                    return [4 /*yield*/, (0, spl_token_1.getAccount)(connection, recipientATA)];
                case 8:
                    recipientAccount = _c.sent();
                    if (!recipientAccount.isInitialized)
                        throw new CreateTransactionError('recipient not initialized');
                    if (recipientAccount.isFrozen)
                        throw new CreateTransactionError('recipient frozen');
                    tokens = BigInt(String(amount));
                    if (tokens > payerAccount.amount)
                        throw new CreateTransactionError('insufficient funds');
                    // Create an instruction to transfer SPL tokens, asserting the mint and decimals match
                    instruction = (0, spl_token_1.createTransferCheckedInstruction)(payerATA, splToken, recipientATA, payer, tokens, mint.decimals);
                    _c.label = 9;
                case 9:
                    // If reference accounts are provided, add them to the transfer instruction
                    if (reference) {
                        if (!Array.isArray(reference)) {
                            reference = [reference];
                        }
                        for (_i = 0, reference_1 = reference; _i < reference_1.length; _i++) {
                            pubkey = reference_1[_i];
                            instruction.keys.push({ pubkey: pubkey, isWritable: false, isSigner: false });
                        }
                    }
                    transaction = new web3_js_1.Transaction();
                    // If a memo is provided, add it to the transaction before adding the transfer instruction
                    if (memo != null) {
                        transaction.add(new web3_js_1.TransactionInstruction({
                            programId: constants_1.MEMO_PROGRAM_ID,
                            keys: [],
                            data: Buffer.from(memo, 'utf8')
                        }));
                    }
                    // Add the transfer instruction to the transaction
                    transaction.add(instruction);
                    return [2 /*return*/, transaction];
            }
        });
    });
}
exports.createTransaction = createTransaction;
