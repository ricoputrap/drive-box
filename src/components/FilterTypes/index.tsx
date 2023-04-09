import { TOption } from '@/types/file.types';
import { getFileTypeOptions } from '@/utils/options';
import { Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import Select, { MultiValue, ActionMeta } from 'react-select';
import customStyles from './customStyles';

const OPTIONS: TOption[] = getFileTypeOptions();

const FilterTypes: React.FC = () => {
  const [types, setTypes] = useState<MultiValue<TOption>>([]);

  const handleTypesChange = (newValue: MultiValue<TOption>, actionMeta: ActionMeta<TOption>) => {
    switch (actionMeta.action) {
      case "remove-value":
        const { removedValue } = actionMeta;
        const updatedTags: MultiValue<TOption> = types.filter(tag => tag.value !== removedValue.value);
        setTypes(updatedTags);
        break;

      default:
        const lastNewValue = newValue[newValue.length - 1];
        setTypes([...types, lastNewValue]);
    }
  }

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