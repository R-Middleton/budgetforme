import { User } from '../entities/User';
import { MyContext } from '../types';
import { validateRegsiter } from '../utils/validateRegister';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { UsernamePasswordInput } from './UsernamePasswordInput';
import argon2 from 'argon2';
import { COOKIENAME, FORGET_PASSWORD_PREFIX } from '../constants';
import { FieldError } from './FieldError';
import { sendEmail } from 'src/utils/sendEmail';
import { v4 } from 'uuid';

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true }) errors?: FieldError[];

  @Field(() => User, { nullable: true }) user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext): Promise<User | null> {
    // you are not logged in
    if (!req.session!.userId) {
      return null!;
    }

    return User.findOne({ where: { id: req.session!.userId } });
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegsiter(options);
    if (errors) {
      return { errors };
    }
    const hashedPassword = await argon2.hash(options.password);

    const user = User.create({
      username: options.username,
      password: hashedPassword,
      email: options.email,
    });

    try {
      await user.save();
    } catch (err) {
      // duplicate username or email error
      if (err.code === '23505' || err.detail.includes('already exists')) {
        if (err.detail.includes('username')) {
          return {
            errors: [{ field: 'username', message: 'username already exists' }],
          };
        }
        if (err.detail.includes('email')) {
          return {
            errors: [{ field: 'email', message: 'email already exists' }],
          };
        }
      }
    }

    // log in user after registering
    req.session!.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      !usernameOrEmail.includes('@')
        ? { where: { username: usernameOrEmail } }
        : { where: { email: usernameOrEmail } }
    );
    if (!user) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: 'that username does not exist',
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      };
    }

    // Store user ID session
    // This will set a cookie on the user
    // and keep them logged in
    req.session!.userId = user.id;
    console.log(req.session!.userId);
    console.log(req.session);
    console.log(req.session!.cookie);

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session!.destroy((err) => {
        res.clearCookie(COOKIENAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Mutation(() => Boolean)
  async ForgotPassword(
    @Arg('email') email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // the email isnt in the db
      return true;
    }

    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      'EX',
      1000 * 60 * 60
    );

    sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
    );
    return true;
  }
}
