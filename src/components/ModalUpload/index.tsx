import { Icon, Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, Stack, Text, FormHelperText } from '@chakra-ui/react';
import React from 'react'
import { IoMdCloudUpload } from 'react-icons/io';
import { Tag } from '@/types/file.types';
import InputMultiCreatable from '../reusables/InputMultiCreatable';
import useFormLabel from './hooks/useFormLabel';
import useFormTags from './hooks/useFormTags';
import useFormUpload from './hooks/useFormUpload';
import useFormFile from './hooks/useFormFile';
import useFormError from './hooks/useFormError';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const options: Tag[] = [
  { value: 'tag1', label: 'Tag 1' },
  { value: 'tag2', label: 'Tag 2' },
  { value: 'tag3', label: 'Tag 3' },
];

const ModalUpload: React.FC<Props> = ({ isOpen, onClose }) => {
  const { label, handleLabelChange } = useFormLabel();
  const { file, fileSize, getRootProps, getInputProps } = useFormFile();
  const { tags, handleTagsChange } = useFormTags();
  const { showLabelError, showFileError } = useFormError();
  const { handleFormCancel, handleSubmit } = useFormUpload(onClose);

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
              <FormControl>

                {/* Label */}
                <FormLabel>Label*</FormLabel>
                <Input
                  type="text"
                  value={ label }
                  onChange={ handleLabelChange }
                />
                { showLabelError &&
                  <FormHelperText
                    color="red.500"
                    fontSize="12px"
                    marginTop="4px"
                  >
                    Label is required
                  </FormHelperText>
                }
              </FormControl>

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
                { showFileError &&
                  <FormHelperText
                    color="red.500"
                    fontSize="12px"
                    marginTop="4px"
                  >
                    File is required
                  </FormHelperText>
                }
              </FormControl>

              {/* Tags */}
              <FormControl>
                <FormLabel>Tags</FormLabel>
                <InputMultiCreatable
                  placeholder="Type and press enter to add a tag"
                  value={tags}
                  options={options}
                  handleChange={ handleTagsChange }
                />
              </FormControl>
            </VStack>

            {/* Buttons */}
            <Flex
              width="100%"
              justifyContent="center"
              columnGap="60px"
              paddingX="66px"
            >
              <Button
                onClick={ handleFormCancel }
                textTransform="uppercase"
                background="transparent"
                color="primaryBlue"
                borderColor="primaryBlue"
                borderWidth="1px"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                textTransform="uppercase"
                background="primaryBlue"
                color="white"
                _hover={{
                  background: "primaryBlueHovered",
                }}
              >
                Submit
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalUpload