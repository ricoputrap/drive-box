import { Box, Flex, Image, Stack, Tag, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
  img: string;
  label: string;
  extension: string;
}

const FileItem: React.FC<Props> = ({ img, label, extension }) => {
  return (
    <Box
      borderRadius="10px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="borderSoft"
      padding="10px"
      width="fit-content"
    >
      <Stack rowGap="12px">
        <Image
          src={ img }
          alt="label"
          width="200px"
          height="200px"
          objectFit="cover"
          borderRadius="10px"
        />

        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="14px" fontWeight={700}>{ label }</Text>
          <Tag textTransform="uppercase">{ extension }</Tag>
        </Flex>
      </Stack>
    </Box>
  )
}

export default FileItem