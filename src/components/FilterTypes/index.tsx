import { TOption } from '@/types/file.types';
import { getFileTypeOptions } from '@/utils/options';
import React from 'react'
import Filter from '../Filter';
import useFilter from './useFilter';

const OPTIONS: TOption[] = getFileTypeOptions();

const FilterTypes: React.FC = () => {
  const { types, handleTypesChange } = useFilter();

  return (
    <Filter
      label="types"
      values={ types }
      handleChange={ handleTypesChange }
      options={ OPTIONS }
      isUppercase
    />
  )
}

export default FilterTypes