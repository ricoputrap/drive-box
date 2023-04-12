import { TOption } from '@/types/file.types';
import React, { useCallback } from 'react'
import { ActionMeta, MultiValue } from 'react-select';
import useUploadStore from '../state/store'

const useFormTags = () => {
  const tags = useUploadStore(state => state.tags);
  const setTags = useUploadStore(state => state.setTags);

  const handleTagsChange = useCallback((newValue: MultiValue<TOption>, actionMeta: ActionMeta<TOption>) => {
    switch (actionMeta.action) {
      case "clear":
        setTags([]);
        break;

      case "remove-value":
        const { removedValue } = actionMeta;
        const updatedTags: MultiValue<TOption> = tags.filter(tag => tag.value !== removedValue.value);
        setTags(updatedTags);
        break;

      default:
        const lastNewValue = newValue[newValue.length - 1];
        setTags([...tags, lastNewValue]);
    }
  }, [tags, setTags]);
  
  return { tags, handleTagsChange };
}

export default useFormTags