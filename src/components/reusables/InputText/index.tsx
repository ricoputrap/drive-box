import FieldError from '@/components/ModalUpload/components/FieldError';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useMemo } from 'react'

interface Props {
  id: string;
  label: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showError?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
}

const InputText: React.FC<Props> = ({
  id, label, value, handleChange,
  showError = false,
  errorMessage = "",
  isRequired = false
}) => {
  const fieldLabel = useMemo(() => {
    let result: string = label;
    if (isRequired) result += "*";
    return result;
  }, [label, isRequired]);

  return (
    <FormControl id={ id }>
      <FormLabel>{ fieldLabel }</FormLabel>
      <Input
        type="text"
        value={ value }
        onChange={ handleChange }
      />
      { showError && <FieldError message={ errorMessage } /> }
    </FormControl>
  )
}

export default InputText