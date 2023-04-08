import { Icon, Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, Stack, Text, FormHelperText } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react'
import { createFilter, MultiValue, ActionMeta } from 'react-select';
import CreateableSelect from "react-select/creatable";
import makeAnimated from 'react-select/animated';
import { useDropzone } from 'react-dropzone';
import { IoMdCloudUpload } from 'react-icons/io';
import supabase, { supabaseUrl } from '@/clients/supabase';

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
  const [showError, setShowError] = useState<boolean>(false);
  const [label, setLabel] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<MultiValue<Tag>>([]);
  const animatedComponents = makeAnimated();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLabel(value);
  }

  const handleTagsChange = (newValue: MultiValue<Tag>, actionMeta: ActionMeta<Tag>) => {
    switch (actionMeta.action) {
      case "clear":
        setTags([]);
        break;

      case "remove-value":
        const { removedValue } = actionMeta;
        const updatedTags: MultiValue<Tag> = tags.filter(tag => tag.value !== removedValue.value);
        setTags(updatedTags);
        break;

      default:
        setTags([...tags, ...newValue]);
    }
  }

  const reset = () => {
    setLabel('');
    setFile(null);
    setTags([]);
    setShowError(false);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (label == "" || file == null) {
      setShowError(true);
      return;
    }

    const { data, error } = await supabase.storage
      .from('drive-box')
      .upload(`${label}`, file)

    if (data) {
      const imgUrl = supabaseUrl + '/storage/v1/object/public/drive-box/' + data.path;
      const newFile = {
        label,
        url: imgUrl,
        extension: "png",
        user_id: "851f138b-901e-4e6a-9186-e2a486e55cdf"
      }

      const {
        data: insertFileData,
        error: insertFileError
      } = await supabase
        .from("FILE")
        .insert([newFile]);
    }

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

  const convertFileSizeToReadable = (size: number) => {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / 1024 / 1024).toFixed(2)} MB`;
    } else {
      return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
    }
  }

  const fileSize = useMemo<string>(() => {
    if (file) {
      return convertFileSizeToReadable(file.size);
    }
    else return "";
  }, [file]);

  const handleFormCancel = () => {
    onClose();
    reset();
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
                <FormLabel>Label*</FormLabel>
                <Input
                  type="text"
                  value={ label }
                  onChange={ handleLabelChange }
                />
                { showError && label == "" &&
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
                { showError && file == null &&
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
                <CreateableSelect
                  isMulti
                  value={tags}
                  options={options}
                  components={ animatedComponents }
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