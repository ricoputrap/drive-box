import { Icon, Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, Stack, Text, FormHelperText } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react'
import { MultiValue, ActionMeta } from 'react-select';
import { useDropzone } from 'react-dropzone';
import { IoMdCloudUpload } from 'react-icons/io';
import supabase, { supabaseUrl } from '@/clients/supabase';
import { Tag, TFile } from '@/types/file.types';
import useBaseStore from '../state/store';
import InputMultiCreatable from '../reusables/InputMultiCreatable';
import useToastSuccess from '@/hooks/useToastSuccess';
import useLoading from '@/hooks/useLoading';

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
  const addFile = useBaseStore(state => state.addFile);

  const { showLoading, closeLoading } = useLoading();
  const { showToastSuccess } = useToastSuccess();

  const [showError, setShowError] = useState<boolean>(false);
  const [label, setLabel] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<MultiValue<Tag>>([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    accept: {
      'image/*': ['.jpeg', '.png']
    }
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
        const lastNewValue = newValue[newValue.length - 1];
        setTags([...tags, lastNewValue]);
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
    showLoading();

    if (label == "" || file == null) {
      setShowError(true);
      closeLoading();
      return;
    }

    const { data, error } = await supabase.storage
      .from('drive-box')
      .upload(`${label}`, file)

    if (error) {
      console.error("===== upload error:", error);
      closeLoading();
      onClose();
      reset();
      return;
    }

    if (data) {
      const url = supabaseUrl + '/storage/v1/object/public/drive-box/' + data.path;
      const extension = file.type == "image/svg+xml" ? "svg" : file.type.split("/")[1];

      const newFile: TFile = {
        label,
        url,
        extension,
        size: file.size,
        user_id: "851f138b-901e-4e6a-9186-e2a486e55cdf",
        tags: tags.reduce((acc, tag) => {
          if (acc == "") return tag.value;
          return acc + ";" + tag.value;
        }, "")
      }

      const {
        data: insertFileData,
        error: insertFileError
      } = await supabase
        .from("FILE")
        .insert([newFile])
        .select();

      if (insertFileError) {
        console.error("===== insertFileError:", insertFileError);
      }
      else {
        newFile.id = insertFileData[0].id;
        showToastSuccess("Upload success.", "The file has been successfully uploaded.");

        addFile(newFile)
      }
    }

    closeLoading();
    onClose();
    reset();
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