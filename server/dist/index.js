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
const user_1 = require("./resolvers/user");
const account_1 = require("./resolvers/account");
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const constants_1 = require("./constants");
const cors_1 = __importDefault(require("cors"));
const AppDataSource_1 = require("./AppDataSource");
const transaction_1 = require("./resolvers/transaction");
const main = async () => {
    await AppDataSource_1.AppDataSource.initialize();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        credentials: true,
    }));
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIENAME,
        store: new RedisStore({
            client: redis,
            disableTouch: false,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            secure: constants_1.__prod__,
            sameSite: 'lax',
        },
        saveUninitialized: false,
        secret: 'keyboard cat',
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [
                hello_1.HelloResolver,
                user_1.UserResolver,
                account_1.AccountResolver,
                transaction_1.TransactionResolver,
            ],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis }),
    });
    apolloServer.start().then(() => {
        apolloServer.applyMiddleware({ app, cors: false });
        app.listen(4000, () => {
            console.log('Server started on localhost:4000');
        });
    });
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map