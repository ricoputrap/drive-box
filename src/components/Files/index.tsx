import { Box, Stack } from '@chakra-ui/react'
import React from 'react'
import Img1 from "../../assets/img-1.jpg"
import FileItem from '../FileItem'

const Files: React.FC = () => {
  return (
    <Box padding="20px" background="white" borderRadius="10px">
      <Stack>

        {/* FILES CONTENT */}
        <FileItem
          img={Img1}
          label="Hiking in Arizona"
        />

        {/* PAGINATION */}
      </Stack>
    </Box>
  )
}

export default Files