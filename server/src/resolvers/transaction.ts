import { AppDataSource } from '../AppDataSource';
import { Ctx, Query, Resolver } from 'type-graphql';
import { Transaction } from '../entities/Transaction';
import { MyContext } from '../types';

// @ObjectType()
// class TransactionResponse {
//   @Field(() => [FieldError], { nullable: true }) errors?: FieldError[];

//   @Field(() => Transaction, { nullable: true }) transaction?: Transaction;
// }

@Resolver()
export class TransactionResolver {
  @Query(() => [Transaction])
  async transactions(@Ctx() {}: MyContext): Promise<Transaction[]> {
    // if (!req.session!.userId) {
    //   return [];
    // } else {
    //   return await Transaction.find({
    //     where: {  },
    //   });

    const transactions = await AppDataSource.getRepository(Transaction)
      .createQueryBuilder('transaction')
      .where('transaction.accountid = :accountid', { accountid: 1 })
      .getOne();

    console.log(transactions);
    return [] as any;
  }

  //   @Query(() => Transaction, { nullable: true })
  //   transaction(@Arg('id') id: number): Promise<Transaction| null> {
  //     return Transaction.findOne({ where: { id } });
  //   }

  //   @Mutation(() => Transaction)
  //   async createTransaction(@Arg('amount') title: string): Promise<Transaction> {
  //     return Transaction.create({ title }).save();
  //   }

  //   @Mutation(() => Transaction, { nullable: true })
  //   async updateTransaction(
  //     @Arg('id') id: number,
  //     @Arg('title') title: string
  //   ): Promise<Transaction| null> {
  //     const post = await Transaction.findOne({ where: { id } });
  //     if (!post) {
  //       return null;
  //     }
  //     if (typeof title !== 'undefined') {
  //       await Transaction.update({ id }, { title });
  //     }
  //     return post;
  //   }

  //   @Mutation(() => Boolean)
  //   async deleteTransaction(@Arg('id') id: number): Transaction<Boolean> {
  //     Transaction.delete(id);
  //     return true;
  //   }

  //   @Mutation(() => UserResponse)
  //   async Login(
  //     @Arg('usernameOrEmail') usernameOrEmail: string,
  //     @Arg('password') password: string,
  //     @Ctx() { req }: MyContext
  //   ): Promise<UserResponse> {
  //     const user = await User.findOne(
  //       !usernameOrEmail.includes('@')
  //         ? { where: { username: usernameOrEmail } }
  //         : { where: { email: usernameOrEmail } }
  //     );
  //     if (!user) {
  //       return {
  //         errors: [
  //           {
  //             field: 'usernameOrEmail',
  //             message: 'that username does not exist',
  //           },
  //         ],
  //       };
  //     }
  //     const valid = await argon2.verify(user.password, password);
  //     if (!valid) {
  //       return {
  //         errors: [
  //           {
  //             field: 'password',
  //             message: 'incorrect password',
  //           },
  //         ],
  //       };
  //     }

  //     // Store user ID session
  //     // This will set a cookie on the user
  //     // and keep them logged in
  //     req.session!.userId = user.id;

  //     return {
  //       user,
  //     };
  //   }

  //   @Mutation(() => Boolean)
  //   async Logout(@Ctx() { req, res }: MyContext) {
  //     return new Promise((resolve) =>
  //       req.session!.destroy((err) => {
  //         res.clearCookie(COOKIENAME);
  //         if (err) {
  //           console.log(err);
  //           resolve(false);
  //           return;
  //         }
  //         resolve(true);
  //       })
  //     );
  //   }
}
