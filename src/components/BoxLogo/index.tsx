import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

const BoxLogo: React.FC = () => {
  return (
    <Flex columnGap="12px" background="white" padding="10px 20px" borderRadius="10px">
      <Box width="40px" height="40px">
        <Image src="/logo.svg" alt="DriveBox" width="40" height="40" />
      </Box>
      <Text fontSize="28px" fontWeight={900} height="40px">
        DriveBox
      </Text>
    </Flex>
  )
}

export default BoxLogo