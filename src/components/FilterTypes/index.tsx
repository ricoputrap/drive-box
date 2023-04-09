import { TOption } from '@/types/file.types';
import { getFileTypeOptions } from '@/utils/options';
import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import Select from 'react-select';
import customStyles from './customStyles';
import useFilter from './useFilter';

const OPTIONS: TOption[] = getFileTypeOptions();

const FilterTypes: React.FC = () => {
  const { types, handleTypesChange } = useFilter();

  return (
    <Box padding="20px" background="white" borderRadius="10px">
      <Text fontSize="20px" fontWeight={700} marginBottom="10px">
        TYPES
      </Text>

      <Select
        isMulti
        placeholder=""
        value={ types }
        options={OPTIONS}
        onChange={ handleTypesChange }
        components={{
          DropdownIndicator:() => null,
          IndicatorSeparator: () => null
        }}
        styles={ customStyles }
        isClearable={ false }
      />
    </Box>
  )
}

export default FilterTypes