import { TOption } from '@/types/file.types'
import { Box, Text } from '@chakra-ui/react';
import React from 'react'
import { ActionMeta, MultiValue } from 'react-select'
import InputMulti from '../reusables/InputMulti';
import InputMultiCreatable from '../reusables/InputMultiCreatable';

interface Props {
  label: string;
  values: MultiValue<TOption>;
  handleChange: (newValue: MultiValue<TOption>, actionMeta: ActionMeta<TOption>) => void;
  options: TOption[];
  isCreatable?: boolean;
  isUppercase?: boolean;
}

const Filter: React.FC<Props> = ({
  label, values, handleChange, options,
  isCreatable = false,
  isUppercase = false
}) => {
  return (
    <Box padding="20px" background="white" borderRadius="10px">
      <Text
        fontSize="20px"
        fontWeight={700}
        marginBottom="10px"
        textTransform="uppercase"
      >
        { label }
      </Text>

      { isCreatable ? (
        <InputMultiCreatable
          placeholder=""
          value={ values }
          options={ options }
          handleChange={ handleChange }
          isUppercase={ isUppercase }
        />
      ) : (
        <InputMulti
          placeholder=""
          value={ values }
          options={ options }
          handleChange={ handleChange }
          isUppercase={ isUppercase }
        />
      )}
    </Box>
  )
}

export default Filter