import { Icon, Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Options, createFilter } from 'react-select';
import CreateableSelect from "react-select/creatable"
import { useDropzone } from 'react-dropzone';
import { IoMdCloudUpload } from 'react-icons/io';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Tag {
  value: string;
  label: string;
}

const options: Tag[] = [
  { value: 'tag1', label: 'Tag 1' },
  { value: 'tag2', label: 'Tag 2' },
  { value: 'tag3', label: 'Tag 3' },
];

const ModalUpload: React.FC<Props> = ({ isOpen, onClose }) => {
  const [label, setLabel] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<Options<Tag>>([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLabel(value);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length) {
      setFile(files[0]);
    }
  }

  const handleTagsChange = (selectedOptions: Options<Tag>) => {
    setTags(selectedOptions);
  }

  const reset = () => {
    setLabel('');
    setFile(null);
    setTags([]);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(label, file, tags);
    onClose();
    reset();
  }

  const handleCreateOption = (inputValue: string) => {
    // Check if the option already exists
    if (tags.find((tag) => tag.label === inputValue))
      return;

    // Create a new option and add it to the list of options
    const newOption: Tag = { value: inputValue, label: inputValue };
    setTags([...tags, newOption]);
  }

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
                <FormLabel>Label</FormLabel>
                <Input
                  type="text"
                  value={ label }
                  onChange={ handleLabelChange }
                />
              </FormControl>

              {/* File */}
              <FormControl>
                <FormLabel>File</FormLabel>
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
                  >
                    {!!file ? (
                      <Box
                        as="span"
                        fontSize="14px"
                        color="textSecondary"
                      >
                        {file.name}
                      </Box>
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

              </FormControl>

              {/* Tags */}
              <FormControl>
                <FormLabel>Tags</FormLabel>
                <CreateableSelect
                  isMulti
                  value={tags}
                  options={options}
                  filterOption={createFilter({ ignoreAccents: false })}
                  onChange={ handleTagsChange }
                  onCreateOption={ handleCreateOption }
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
                onClick={ onClose }
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