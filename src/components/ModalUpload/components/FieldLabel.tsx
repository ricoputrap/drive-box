import InputText from '@/components/reusables/InputText';
import React from 'react'
import useFormError from '../hooks/useFormError';
import useFormLabel from '../hooks/useFormLabel'

const FieldLabel: React.FC = () => {
  const { label, handleLabelChange } = useFormLabel();
  const { showLabelError } = useFormError();

  return (
    <InputText
      id="modal-upload__label"
      label="Label"
      value={ label }
      handleChange={ handleLabelChange }
      showError={ showLabelError }
      errorMessage="Label is required"
      isRequired
    />
  )
}

export default FieldLabel