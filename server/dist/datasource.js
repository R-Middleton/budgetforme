"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    database: 'budgetforme',
    username: 'postgres',
    password: 'postgres',
    logging: true,
    synchronize: true,
    entities: ['src/entities/**/*.ts'],
});
//# sourceMappingURL=datasource.js.map