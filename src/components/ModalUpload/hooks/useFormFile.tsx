import React, { useMemo } from 'react'
import { useDropzone } from 'react-dropzone';
import useUploadStore from '../state/store'
import { convertFileSizeToReadable } from '../utils';

const useFormFile = () => {
  const file = useUploadStore(state => state.file);
  const setFile = useUploadStore(state => state.setFile);

  const fileSize = useMemo(() => {
    if (file) {
      return convertFileSizeToReadable(file.size);
    }
    else return "";
  }, [file]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    accept: {
      'image/*': ['.jpeg', '.png']
    }
  });

  return {
    file, fileSize, setFile,
    getRootProps, getInputProps
  };
}

export default useFormFile