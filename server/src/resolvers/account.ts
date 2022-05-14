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

  // @Mutation(() => UserResponse)
  // async Login(
  //   @Arg('usernameOrEmail') usernameOrEmail: string,
  //   @Arg('password') password: string,
  //   @Ctx() { req }: MyContext
  // ): Promise<UserResponse> {
  //   const user = await User.findOne(
  //     !usernameOrEmail.includes('@')
  //       ? { where: { username: usernameOrEmail } }
  //       : { where: { email: usernameOrEmail } }
  //   );
  //   if (!user) {
  //     return {
  //       errors: [
  //         {
  //           field: 'usernameOrEmail',
  //           message: 'that username does not exist',
  //         },
  //       ],
  //     };
  //   }
  //   const valid = await argon2.verify(user.password, password);
  //   if (!valid) {
  //     return {
  //       errors: [
  //         {
  //           field: 'password',
  //           message: 'incorrect password',
  //         },
  //       ],
  //     };
  //   }

  //   // Store user ID session
  //   // This will set a cookie on the user
  //   // and keep them logged in
  //   req.session!.userId = user.id;

  //   return {
  //     user,
  //   };
  // }

  // @Mutation(() => Boolean)
  // async Logout(@Ctx() { req, res }: MyContext) {
  //   return new Promise((resolve) =>
  //     req.session!.destroy((err) => {
  //       res.clearCookie(COOKIENAME);
  //       if (err) {
  //         console.log(err);
  //         resolve(false);
  //         return;
  //       }
  //       resolve(true);
  //     })
  //   );
  // }
}
