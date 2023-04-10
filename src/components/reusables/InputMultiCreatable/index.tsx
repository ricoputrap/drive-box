import { getCustomStyles } from '@/components/Filter/customStyles';
import { TOption } from '@/types/file.types';
import React, { useMemo } from 'react'
import { ActionMeta, MultiValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import useInteraction from './useInteraction';

interface Props {
  placeholder: string;
  value: MultiValue<TOption>;
  options: TOption[];
  handleChange: (newValue: MultiValue<TOption>, actionMeta: ActionMeta<TOption>) => void;
  isUppercase?: boolean;
}

const InputMultiCreatable: React.FC<Props> = ({
  placeholder, value, options,
  handleChange,
  isUppercase = false
}) => {
  const { inputValue, handleInputChange, handleKeyDown } = useInteraction(value, handleChange);
  const customStyles = useMemo(() => getCustomStyles(isUppercase), [isUppercase]);
  
  return (
    <CreatableSelect
      isMulti
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
      menuIsOpen={ false }
      inputValue={ inputValue }
      onInputChange={ handleInputChange }
      onKeyDown={ handleKeyDown }
    />
  )
}

export default InputMultiCreatable