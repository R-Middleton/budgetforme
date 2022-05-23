"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Transaction_1 = require("../entities/Transaction");
const isAuth_1 = require("../middleware/isAuth");
let TransactionInput = class TransactionInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], TransactionInput.prototype, "date", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TransactionInput.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], TransactionInput.prototype, "amount", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TransactionInput.prototype, "note", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], TransactionInput.prototype, "accountId", void 0);
TransactionInput = __decorate([
    (0, type_graphql_1.InputType)()
], TransactionInput);
let TransactionResolver = class TransactionResolver {
    async transactions(id) {
        const transactions = await Transaction_1.Transaction.find({ where: { accountId: id } });
        return transactions;
    }
    async transaction(id) {
        const transaction = await Transaction_1.Transaction.findOne({ where: { id } });
        return transaction || null;
    }
    async createTransaction(input) {
        return Transaction_1.Transaction.create(Object.assign({}, input)).save();
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Transaction_1.Transaction]),
    __param(0, (0, type_graphql_1.Arg)('accountId', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TransactionResolver.prototype, "transactions", null);
__decorate([
    (0, type_graphql_1.Query)(() => Transaction_1.Transaction),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TransactionResolver.prototype, "transaction", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Transaction_1.Transaction),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TransactionInput]),
    __metadata("design:returntype", Promise)
], TransactionResolver.prototype, "createTransaction", null);
TransactionResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TransactionResolver);
exports.TransactionResolver = TransactionResolver;
//# sourceMappingURL=transaction.js.map