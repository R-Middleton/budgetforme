import { Field, Float, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Transaction } from './Transaction';
import { Category } from './Category';

@ObjectType()
@Entity()
export class Account extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => Float)
  @Column({ type: 'float', default: 0 })
  balance!: number;

  @Field()
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.accounts)
  user!: User;

  @Field(() => [Transaction])
  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @OneToMany(() => Category, (category) => category.account)
  categories: Category[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
