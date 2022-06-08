import { MikroORM /*, RequiredEntityData */ } from '@mikro-orm/core'
import { __prod__ } from './constants'
// import { Post } from './entities/Post'
import microConfig from './mikro-orm.config'

const main = async () => {
  const orm = await MikroORM.init(microConfig)
  await orm.getMigrator().up()
  // const repo = orm.em.getRepository<Post>('Post')
  // const post = repo.create({
  //   title: 'my first post',
  // } as RequiredEntityData<Post>) // instance of internal Author class
  // await repo.persistAndFlush(post)

  // const posts = await orm.em.find('Post', {})
  // console.log(posts)
}

main().catch((err) => {
  console.log(err)
})
