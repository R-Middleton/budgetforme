import { MyContext } from '../types';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Account } from '../entities/Account';
import { isAuth } from '../middleware/isAuth';

@InputType()
class AccountInput {
  @Field()
  name: string;
}

@Resolver()
export class AccountResolver {
  @Mutation(() => Account)
  @UseMiddleware(isAuth)
  async createAccount(
    @Arg('input') input: AccountInput,
    @Ctx() { req }: MyContext
  ): Promise<Account> {
    return Account.create({
      ...input,
      userId: req.session!.userId,
    }).save();
  }

  @Query(() => [Account])
  async accounts(@Ctx() { req }: MyContext): Promise<Account[]> {
    console.log(req.session!.userId);
    if (!req.session!.userId) {
      return [];
    } else {
      return await Account.find({
        where: { userId: req.session!.userId },
      });
    }
  }
}
