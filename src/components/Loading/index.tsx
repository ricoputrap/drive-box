import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react';
import useBaseStore from '../state/store'

const Loading: React.FC = () => {
  const loading = useBaseStore(state => state.loading);

  if (!loading) return <></>
  return (
    <Flex
      position="absolute"
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      background="#0000004D"
      zIndex={10000}
    >
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Flex>
  )
}

export default Loading