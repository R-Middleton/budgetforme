import { Field, Float, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from './Account';

@ObjectType()
@Entity()
export class Transaction extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  date!: Date;

  @Field(() => Float)
  @Column({ type: 'float', default: 0 })
  amount!: number;

  @Field()
  @Column()
  note: string;

  @Field()
  @Column()
  type!: string;

  @Field()
  @Column()
  accountId!: number;

  @ManyToOne(() => Account, (account) => account.transactions)
  account!: Account;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
