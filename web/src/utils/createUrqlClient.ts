import { dedupExchange, errorExchange, fetchExchange } from '@urql/core'
import { cacheExchange } from '@urql/exchange-graphcache'
import Router from 'next/router'
import {
  CreateAccountMutation,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from '../generated/graphql'
import { betterUpdateQuery } from './betterUpdateQuery'

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          createAccount: (result, _args, cache, _info) => {
            betterUpdateQuery<CreateAccountMutation, MeQuery>(
              cache,
              { query: MeDocument },
              result,
              (result, query) => ({
                __typename: 'Query',
                me: {
                  __typename: 'User',
                  id: query.me!.id,
                  username: query.me!.username,
                  accounts: query.me!.accounts.concat([result.createAccount]),
                },
              })
            )
          },
          logout: (result, _args, cache, _info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              result,
              () => ({ me: null })
            )
          },
          login: (_result, _args, cache, _info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query
                } else {
                  return {
                    me: result.login.user,
                  }
                }
              }
            )
          },
          register: (_result, _args, cache, _info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query
                } else {
                  return {
                    me: result.register.user,
                  }
                }
              }
            )
          },
        },
      },
    }),
    errorExchange({
      onError(error) {
        if (error?.message.includes('not authenticated')) {
          Router.replace('/login')
        }
        console.log('[Error]', error.message)
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
})
