import { Button, Flex, Icon, Input, InputGroup, InputLeftElement, useDisclosure } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { IoMdCloudUpload, IoMdSearch } from "react-icons/io"
import ModalUpload from '../ModalUpload';
import useBaseStore from '../state/store';

const TopMenuContainer: React.FC = () => {
  const searchValue = useBaseStore(state => state.searchValue);
  const setSearchValue = useBaseStore(state => state.setSearchValue);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <Flex
      background="white"
      padding="10px 20px"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="10px"
    >
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
        >
          <Icon w="20px" h="20px" as={IoMdSearch} />
        </InputLeftElement>
        <Input
          placeholder="Search"
          w="230px"
          background="backgroundSecondary"
          border="none"
          value={ searchValue }
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </InputGroup>

      <Button
        onClick={onOpen}
        background="primaryBlue"
        color="white"
        leftIcon={<Icon w="20px" h="20px" as={IoMdCloudUpload} />}
        _hover={{
          background: "primaryBlueHovered",
        }}
      >
        UPLOAD
      </Button>

      <ModalUpload
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  )
}

export default TopMenuContainer