import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import useFormUpload from '../hooks/useFormUpload'

interface Props {
  onClose: () => void;
}

const FormActions: React.FC<Props> = ({ onClose }) => {
  const { handleFormCancel } = useFormUpload(onClose)
  
  return (
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
  )
}

export default FormActions