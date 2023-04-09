import { TOption } from '@/types/file.types';
import React, { useState } from 'react'
import { ActionMeta, MultiValue } from 'react-select';

const useFilter = (
  values: MultiValue<TOption>,
  handleChange: (newValue: MultiValue<TOption>, actionMeta: ActionMeta<TOption>) => void,
) => {
  const [inputValue, setInputValue] = useState<string>("");
  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        event.preventDefault();
        const newOption: TOption = { value: inputValue, label: inputValue };
        handleChange([...values, newOption], { action: "create-option" } as ActionMeta<TOption>);
        setInputValue("");
    }
  }

  return { inputValue, handleInputChange, handleKeyDown }
}

export default useFilter