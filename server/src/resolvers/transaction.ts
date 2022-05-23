import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Transaction } from '../entities/Transaction';
import { isAuth } from '../middleware/isAuth';

@InputType()
class TransactionInput {
  @Field()
  date: Date;
  @Field()
  type: string;
  @Field()
  amount: number;
  @Field()
  note: string;
  @Field()
  accountId: number;
}
// @ObjectType()
// class TransactionResponse {
//   @Field(() => [FieldError], { nullable: true }) errors?: FieldError[];

//   @Field(() => Transaction, { nullable: true }) transaction?: Transaction;
// }

@Resolver()
export class TransactionResolver {
  @Query(() => [Transaction])
  async transactions(
    @Arg('accountId', () => Int) id: number
  ): Promise<Transaction[]> {
    const transactions = await Transaction.find({ where: { accountId: id } });
    return transactions;
  }

  @Query(() => Transaction)
  async transaction(
    @Arg('id', () => Int) id: number
  ): Promise<Transaction | null> {
    const transaction = await Transaction.findOne({ where: { id } });
    return transaction || null;
  }

  @Mutation(() => Transaction)
  @UseMiddleware(isAuth)
  async createTransaction(
    @Arg('input') input: TransactionInput
  ): Promise<Transaction> {
    return Transaction.create({
      ...input,
    }).save();
  }
}
