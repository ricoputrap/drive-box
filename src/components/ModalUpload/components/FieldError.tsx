import { FormHelperText } from '@chakra-ui/react';
import React from 'react'

interface Props {
  message: string;
}

const FieldError: React.FC<Props> = ({ message }) => {
  return (
    <FormHelperText
      color="red.500"
      fontSize="12px"
      marginTop="4px"
    >
      { message }
    </FormHelperText>
  )
}

export default FieldError