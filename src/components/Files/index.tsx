import { Box, Flex, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Img1 from "../../assets/img-1.jpg"
import FileItem from '../FileItem'
import supabase from "../../clients/supabase";
import { TFile } from '@/types/file.types';

interface Props {
  files: TFile[];
}

const Files: React.FC<Props> = ({ files }) => {
  return (
    <Box padding="20px" background="white" borderRadius="10px">
      <Stack>

        {/* FILES CONTENT */}
        <Flex gap="40px" wrap="wrap">
          {files.map((file) => (
            <FileItem
              key={file.id}
              img={file.url}
              label={file.label}
              extension={file.extension}
            />
          ))}
        </Flex>

        {/* PAGINATION */}
      </Stack>
    </Box>
  )
}

export default Files