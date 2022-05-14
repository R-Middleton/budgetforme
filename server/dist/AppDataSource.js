"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Transaction_1 = require("./entities/Transaction");
const Account_1 = require("./entities/Account");
const Category_1 = require("./entities/Category");
const CategoryGroup_1 = require("./entities/CategoryGroup");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    database: 'budgetforme',
    username: 'postgres',
    password: 'postgres',
    logging: true,
    synchronize: true,
    entities: [User_1.User, Account_1.Account, Transaction_1.Transaction, Category_1.Category, CategoryGroup_1.CategoryGroup],
});
//# sourceMappingURL=AppDataSource.js.map