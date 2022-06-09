import { Navbar } from '../components/Navbar'
import { usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'

const Index = () => {
  const [{ data }] = usePostsQuery()

  return (
    <>
      <Navbar />
      <div>Hello World</div>
      <br />
      {!data ? (
        <div>Loading...</div>
      ) : (
        data.posts.map((p) => <div key={p._id}>{p.title}</div>)
      )}
    </>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
