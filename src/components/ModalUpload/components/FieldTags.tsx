import InputMultiCreatable from '@/components/reusables/InputMultiCreatable';
import { TOption } from '@/types/file.types';
import { FormControl, FormLabel } from '@chakra-ui/react';
import React from 'react'
import useFormTags from '../hooks/useFormTags'

const OPTIONS: TOption[] = []

const FieldTags: React.FC = () => {
  const { tags, handleTagsChange } = useFormTags();
  
  return (
    <FormControl id="modal-upload__tags">
      <FormLabel>Tags</FormLabel>
      <InputMultiCreatable
        placeholder="Type and press enter to add a tag"
        value={tags}
        options={OPTIONS}
        handleChange={ handleTagsChange }
      />
    </FormControl>
  )
}

export default FieldTags