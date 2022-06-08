import { MikroORM /*, RequiredEntityData */ } from '@mikro-orm/core'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import session from 'express-session'
import { createClient } from 'redis'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { __prod__ } from './constants'
import microConfig from './mikro-orm.config'
import { HelloResolver } from './resolvers/hello'
import { PostResolver } from './resolvers/post'
import { UserResolver } from './resolvers/user'
import { MyContext } from './types'

const main = async () => {
  const orm = await MikroORM.init(microConfig)
  await orm.getMigrator().up()

  const app = express()

  const RedisStore = require('connect-redis')(session)
  const redisClient = createClient()

  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: 'fdslajflaskjdflkasjflkasjdfl',
      resave: false,
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => <MyContext>{ em: orm.em, req, res },
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log(`server started on http://localhost:4000`)
  })
}

main().catch((err) => {
  console.log(err)
})
