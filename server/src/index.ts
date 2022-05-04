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
