import { Box, Flex, Stack, Tag, Text } from '@chakra-ui/react'
import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface Props {
  img: StaticImageData;
  label: string;
}

const FileItem: React.FC<Props> = ({ img, label }) => {
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
        <Image src={ img } alt="files" />

        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="14px" fontWeight={700}>{ label }</Text>
          <Tag>JPG</Tag>
        </Flex>
      </Stack>
    </Box>
  )
}

export default FileItem