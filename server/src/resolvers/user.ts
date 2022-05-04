import { User } from '../entities/User';
// import { MyContext } from '../types';
import { validateRegsiter } from '../utils/validateRegister';
import { Arg, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { UsernamePasswordInput } from './UsernamePasswordInput';
import argon2 from 'argon2';

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true }) errors?: FieldError[];

  @Field(() => User, { nullable: true }) user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async Register(
    @Arg('options') options: UsernamePasswordInput
    // @Ctx() { req }: MyContext
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
        if (err.constraint.includes('username')) {
          return {
            errors: [{ field: 'username', message: 'username already exists' }],
          };
        }
        if (err.constraint.includes('email')) {
          return {
            errors: [{ field: 'email', message: 'email already exists' }],
          };
        }
      }
    }

    // log in user after registering
    // req.session!.userId = user.id;

    return {
      user,
    };
  }
}
