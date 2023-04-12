import React, { useMemo } from 'react'
import useUploadStore from '../state/store'

const useFormError = () => {
  const showError = useUploadStore(state => state.showError);
  const setShowError = useUploadStore(state => state.setShowError);
  const label = useUploadStore(state => state.label);
  const file = useUploadStore(state => state.file);

  const showLabelError = useMemo(() => showError && label == "", [showError, label]);
  const showFileError = useMemo(() => showError && file == undefined, [showError, file]);

  const doShowError = () => setShowError(true);

  return { showLabelError, showFileError, doShowError }
}

export default useFormError