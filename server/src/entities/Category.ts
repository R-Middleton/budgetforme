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
import { Account } from './Account';
import { CategoryGroup } from './CategoryGroup';

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => Float)
  @Column({ type: 'float', default: 0 })
  assigned!: number;

  @Field(() => Float)
  @Column({ type: 'float', default: 0 })
  activity!: number;

  @Field()
  @Column()
  accountId: number;

  @ManyToOne(() => Account, (account) => account.categories)
  account!: Account;

  @OneToMany(() => CategoryGroup, (categoryGroup) => categoryGroup.category)
  categoryGroups: CategoryGroup[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
