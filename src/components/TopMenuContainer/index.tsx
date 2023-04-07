import { Button, Flex, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'
import { IoMdCloudUpload, IoMdSearch } from "react-icons/io"

const TopMenuContainer: React.FC = () => {
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
        />
      </InputGroup>

      <Button
        background="primaryBlue"
        color="white"
        leftIcon={<Icon w="20px" h="20px" as={IoMdCloudUpload} />}
        _hover={{
          background: "primaryBlueHovered",
        }}
      >
        UPLOAD
      </Button>
    </Flex>
  )
}

export default TopMenuContainer