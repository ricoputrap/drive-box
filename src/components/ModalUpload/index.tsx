import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from '@chakra-ui/react';
import React from 'react'
import useFormUpload from './hooks/useFormUpload';
import FieldLabel from './components/FieldLabel';
import FieldTags from './components/FieldTags';
import FormActions from './components/FormActions';
import FieldFile from './components/FieldFile';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ModalUpload: React.FC<Props> = ({ isOpen, onClose }) => {
  const { handleSubmit } = useFormUpload(onClose);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Upload</ModalHeader>
        <ModalCloseButton />

        <ModalBody paddingBottom="24px">
          <form onSubmit={ handleSubmit }>
            <VStack spacing="12px" marginBottom="20px">
              <FieldLabel />
              <FieldFile />
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