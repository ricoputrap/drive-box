import { Icon, Box, Flex, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, Stack, Text } from '@chakra-ui/react';
import React from 'react'
import { IoMdCloudUpload } from 'react-icons/io';
import useFormUpload from './hooks/useFormUpload';
import useFormFile from './hooks/useFormFile';
import useFormError from './hooks/useFormError';
import FieldError from './components/FieldError';
import FieldLabel from './components/FieldLabel';
import FieldTags from './components/FieldTags';
import FormActions from './components/FormActions';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ModalUpload: React.FC<Props> = ({ isOpen, onClose }) => {
  const { file, fileSize, getRootProps, getInputProps } = useFormFile();
  const { showFileError } = useFormError();
  const { handleSubmit } = useFormUpload(onClose);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Upload</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {/* input text for "label" */}
          <form onSubmit={ handleSubmit }>
            <VStack spacing="12px" marginBottom="20px">
              <FieldLabel />

              {/* File */}
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

              <FieldTags />
            </VStack>

            <FormActions onClose={ onClose } />
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalUpload