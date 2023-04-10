import { getCustomStyles } from '@/components/Filter/customStyles';
import { TOption } from '@/types/file.types';
import React, { useMemo } from 'react'
import { ActionMeta, MultiValue } from 'react-select';
import Select from 'react-select';

interface Props {
  placeholder: string;
  value: MultiValue<TOption>;
  options: TOption[];
  handleChange: (newValue: MultiValue<TOption>, actionMeta: ActionMeta<TOption>) => void;
  isUppercase?: boolean;
}

const InputMulti: React.FC<Props> = ({
  placeholder, value, options,
  handleChange,
  isUppercase = false
}) => {
  const customStyles = useMemo(() => getCustomStyles(isUppercase), [isUppercase]);

  return (
    <Select
      placeholder={ placeholder }
      value={ value }
      options={ options }
      onChange={ handleChange }
      components={{
        DropdownIndicator:() => null,
        IndicatorSeparator: () => null
      }}
      styles={ customStyles }
      isClearable={ false }
      isMulti
    />
  )
}

export default InputMulti