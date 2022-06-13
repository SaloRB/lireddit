import { Navbar } from '../components/Navbar'
import { usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import { Layout } from '../components/Layout'
import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  })

  return (
    <Layout>
      <NextLink href="/create-post">
        <Link>create post</Link>
      </NextLink>
      <br />
      {!data ? (
        <div>Loading...</div>
      ) : (
        data.posts.map((p) => <div key={p._id}>{p.title}</div>)
      )}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
