import { Box, Flex, Stack } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import FileItem from '../FileItem'
import useBaseStore from '../state/store';

const Files: React.FC = () => {
  const getFiles = useBaseStore(state => state.getFiles);
  const files = useBaseStore(state => state.files);
  const searchValue = useBaseStore(state => state.searchValue);
  const types = useBaseStore(state => state.types);
  const filteredFiles = useMemo(
    () => getFiles(),
    [getFiles, files, searchValue, types]
  );

  return (
    <Box padding="20px" background="white" borderRadius="10px">
      <Stack>

        {/* FILES CONTENT */}
        <Flex gap="40px" wrap="wrap">
          {filteredFiles.map((file) => (
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