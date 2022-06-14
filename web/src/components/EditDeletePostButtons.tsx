import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, IconButton, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useDeletePostMutation, useMeQuery } from '../generated/graphql'

interface EditDeletePostButtonsProps {
  id: number
  creatorId: number
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const router = useRouter()

  const [{ data: meData }] = useMeQuery()
  const [, deletePost] = useDeletePostMutation()

  if (meData?.me?.id !== creatorId) {
    return null
  }

  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          aria-label="edit post"
          mr={4}
          icon={<EditIcon />}
        />
      </NextLink>
      <IconButton
        aria-label="delete post"
        icon={<DeleteIcon />}
        onClick={() => {
          deletePost({ id })
          router.push('/')
        }}
      />
    </Box>
  )
}
