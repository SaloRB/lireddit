import React from 'react'
import { Box, Link, Flex, Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useMeQuery } from '../generated/graphql'

interface Navbar {}

export const Navbar: React.FC<Navbar> = ({}) => {
  const [{ data, fetching }] = useMeQuery()
  let body = null

  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    )
    // user is logged in
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button variant="link">logout</Button>
      </Flex>
    )
  }

  return (
    <Flex bg="tomato" p={4}>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  )
}