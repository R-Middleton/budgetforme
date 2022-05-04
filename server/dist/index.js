"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Transaction_1 = require("./entities/Transaction");
const Account_1 = require("./entities/Account");
const user_1 = require("./resolvers/user");
const main = async () => {
    const dataSource = new typeorm_1.DataSource({
        type: 'postgres',
        database: 'budgetforme',
        username: 'postgres',
        password: 'postgres',
        logging: true,
        synchronize: true,
        entities: [User_1.User, Account_1.Account, Transaction_1.Transaction],
    });
    await dataSource.initialize();
    const app = (0, express_1.default)();
    app.get('/', (_, res) => {
        res.send('Hello World!');
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, user_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    apolloServer.start().then(() => {
        apolloServer.applyMiddleware({ app });
        app.listen(4000, () => {
            console.log('Server started on localhost:4000');
        });
    });
};
main().catch(console.error);
//# sourceMappingURL=index.js.map