import { TOption } from '@/types/file.types'
import { Box, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react'
import Select, { ActionMeta, MultiValue } from 'react-select'
import CreatableSelect from "react-select/creatable";
import { getCustomStyles } from './customStyles';
import useFilter from './useFilter';

interface Props {
  label: string;
  values: MultiValue<TOption>;
  handleChange: (newValue: MultiValue<TOption>, actionMeta: ActionMeta<TOption>) => void;
  options: TOption[];
  isCreatable?: boolean;
  isUppercase?: boolean;
}

const Filter: React.FC<Props> = ({ label, values, handleChange, options, isCreatable = false, isUppercase = false }) => {
  const { inputValue, handleInputChange, handleKeyDown } = useFilter(values, handleChange);
  const customStyles = useMemo(() => getCustomStyles(isUppercase), [isUppercase])

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
        <CreatableSelect
          isMulti
          placeholder=""
          value={ values }
          options={ options }
          onChange={ handleChange }
          components={{
            DropdownIndicator:() => null,
            IndicatorSeparator: () => null
          }}
          styles={ customStyles }
          isClearable={ false }
          menuIsOpen={ false }
          inputValue={ inputValue }
          onInputChange={ handleInputChange }
          onKeyDown={ handleKeyDown }
        />
      ) : (
        <Select
          isMulti
          placeholder=""
          value={ values }
          options={ options }
          onChange={ handleChange }
          components={{
            DropdownIndicator:() => null,
            IndicatorSeparator: () => null
          }}
          styles={ customStyles }
          isClearable={ false }
        />
      )}
    </Box>
  )
}

export default Filter