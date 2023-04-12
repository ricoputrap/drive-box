import React, { useCallback } from 'react'
import useUploadStore from '../state/store'

const useFormLabel = () => {
  const label = useUploadStore(state => state.label);
  const setLabel = useUploadStore(state => state.setLabel);

  const handleLabelChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLabel(value);
  }, [setLabel]);

  return { label, handleLabelChange }
}

export default useFormLabel