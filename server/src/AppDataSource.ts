import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Transaction } from './entities/Transaction';
import { Account } from './entities/Account';
import { Category } from './entities/Category';
import { CategoryGroup } from './entities/CategoryGroup';

export const AppDataSource = new DataSource({
  type: 'postgres',
  database: 'budgetforme',
  username: 'postgres',
  password: 'postgres',
  logging: true,
  synchronize: true,
  entities: [User, Account, Transaction, Category, CategoryGroup],
});
