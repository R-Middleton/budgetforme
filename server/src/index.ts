import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Transaction } from './entities/Transaction';
import { Account } from './entities/Account';
import { MyContext } from './types';
import { UserResolver } from './resolvers/user';
import connectRedis from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';
import { COOKIENAME, __prod__ } from './constants';
import cors from 'cors';

declare module 'express-session' {
  interface Session {
    userId: number;
  }
}

const main = async () => {
  const dataSource = new DataSource({
    type: 'postgres',
    database: 'budgetforme',
    username: 'postgres',
    password: 'postgres',
    logging: true,
    synchronize: true,
    entities: [User, Account, Transaction],
  });
  await dataSource.initialize();

  const app = express();
  app.get('/', (_, res) => {
    res.send('Hello World!');
  });

  app.use(
    cors({
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    session({
      name: COOKIENAME,
      store: new RedisStore({
        client: redis as any,
        disableTouch: false,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        secure: __prod__, // cookie only works in https
        sameSite: 'lax', //csrf
      },
      saveUninitialized: false,
      secret: 'change this secret',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
  });

  apolloServer.start().then(() => {
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
      console.log('Server started on localhost:4000');
    });
  });
};

main().catch(console.error);
