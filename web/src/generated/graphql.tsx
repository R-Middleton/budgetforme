import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Account = {
  __typename?: 'Account';
  balance: Scalars['Float'];
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  transactions: Array<Transaction>;
  updatedAt: Scalars['String'];
  userId: Scalars['Float'];
};

export type AccountInput = {
  name: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createAccount: Account;
  createTransaction: Transaction;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateAccountArgs = {
  input: AccountInput;
};


export type MutationCreateTransactionArgs = {
  input: TransactionInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  accounts: Array<Account>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  transaction: Transaction;
  transactions: Array<Transaction>;
};


export type QueryAccountArgs = {
  id: Scalars['Int'];
};


export type QueryTransactionArgs = {
  id: Scalars['Int'];
};


export type QueryTransactionsArgs = {
  accountId: Scalars['Int'];
};

export type Transaction = {
  __typename?: 'Transaction';
  accountId: Scalars['Float'];
  amount: Scalars['Float'];
  createdAt: Scalars['String'];
  date: Scalars['DateTime'];
  id: Scalars['Float'];
  note: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type TransactionInput = {
  accountId: Scalars['Float'];
  amount: Scalars['Float'];
  date: Scalars['DateTime'];
  note: Scalars['String'];
  type: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  accounts: Array<Account>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, accounts: Array<{ __typename?: 'Account', id: number, name: string, balance: number }> };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, accounts: Array<{ __typename?: 'Account', id: number, name: string, balance: number }> } | null };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, accounts: Array<{ __typename?: 'Account', id: number, name: string, balance: number }> } | null } };

export type CreateAccountMutationVariables = Exact<{
  input: AccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'Account', id: number, name: string, balance: number, userId: number, createdAt: string, updatedAt: string } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, accounts: Array<{ __typename?: 'Account', id: number, name: string, balance: number }> } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, accounts: Array<{ __typename?: 'Account', id: number, name: string, balance: number }> } | null } };

export type AccountQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AccountQuery = { __typename?: 'Query', account?: { __typename?: 'Account', id: number, name: string, balance: number, userId: number } | null };

export type AccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountsQuery = { __typename?: 'Query', accounts: Array<{ __typename?: 'Account', id: number, name: string, balance: number, userId: number, createdAt: string, updatedAt: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, accounts: Array<{ __typename?: 'Account', id: number, name: string, balance: number }> } | null };

export type TransactionsQueryVariables = Exact<{
  accountId: Scalars['Int'];
}>;


export type TransactionsQuery = { __typename?: 'Query', transactions: Array<{ __typename?: 'Transaction', id: number, amount: number, note: string, type: string, accountId: number, createdAt: string, updatedAt: string, date: any }> };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  accounts {
    id
    name
    balance
  }
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateAccountDocument = gql`
    mutation CreateAccount($input: AccountInput!) {
  createAccount(input: $input) {
    id
    name
    balance
    userId
    createdAt
    updatedAt
  }
}
    `;

export function useCreateAccountMutation() {
  return Urql.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const AccountDocument = gql`
    query Account($id: Int!) {
  account(id: $id) {
    id
    name
    balance
    userId
  }
}
    `;

export function useAccountQuery(options: Omit<Urql.UseQueryArgs<AccountQueryVariables>, 'query'>) {
  return Urql.useQuery<AccountQuery>({ query: AccountDocument, ...options });
};
export const AccountsDocument = gql`
    query Accounts {
  accounts {
    id
    name
    balance
    userId
    createdAt
    updatedAt
  }
}
    `;

export function useAccountsQuery(options?: Omit<Urql.UseQueryArgs<AccountsQueryVariables>, 'query'>) {
  return Urql.useQuery<AccountsQuery>({ query: AccountsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const TransactionsDocument = gql`
    query Transactions($accountId: Int!) {
  transactions(accountId: $accountId) {
    id
    amount
    note
    type
    accountId
    createdAt
    updatedAt
    date
  }
}
    `;

export function useTransactionsQuery(options: Omit<Urql.UseQueryArgs<TransactionsQueryVariables>, 'query'>) {
  return Urql.useQuery<TransactionsQuery>({ query: TransactionsDocument, ...options });
};