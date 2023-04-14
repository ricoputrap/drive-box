import { Box, Flex, FormControl, FormLabel, Stack, Text, Icon } from '@chakra-ui/react';
import React from 'react';
import { IoMdCloudUpload } from 'react-icons/io';
import useFormError from '../hooks/useFormError';
import useFormFile from '../hooks/useFormFile';
import FieldError from './FieldError';


const FieldFile: React.FC = () => {
  const { file, fileSize, getRootProps, getInputProps } = useFormFile();
  const { showFileError } = useFormError();

  return (
    <FormControl>
      <FormLabel>File*</FormLabel>

      <Box
        {...getRootProps()}
        height="80px"
        background="backgroundSecondary"
        border="1px dashed #BDBDBD"
        borderRadius="10px"
      >
        <input {...getInputProps()} />
        <Flex
          height="100%"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          _hover={{
            cursor: "pointer",
          }}
        >
          {!!file ? (
            <Stack
              as="span"
              fontSize="14px"
              color="textSecondary"
              textAlign="center"
            >
              <Text>{file.name}</Text>
              <Text>{fileSize}</Text>
            </Stack>
          ) : (
            <>
              <Icon w="20px" h="20px" as={IoMdCloudUpload} />
              <Box
                as="span"
                fontSize="14px"
                color="textSecondary"
                marginTop="10px"
              >
                Drag and drop or click to upload
              </Box>
            </>
          )}
        </Flex>
      </Box>
      { showFileError && <FieldError message="File is required" /> }
    </FormControl>
  )
}

export default FieldFile