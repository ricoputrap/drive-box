import supabase, { supabaseUrl } from '@/clients/supabase';
import useFile from '@/hooks/useFile';
import useLoading from '@/hooks/useLoading';
import useToastSuccess from '@/hooks/useToastSuccess';
import { TFile } from '@/types/file.types';
import React, { useCallback } from 'react'
import useUploadStore from '../state/store'
import useFormError from './useFormError';

const useFormUpload = (onClose: () => void) => {
  const reset = useUploadStore(state => state.reset);
  const label = useUploadStore(state => state.label);
  const file = useUploadStore(state => state.file);
  const tags = useUploadStore(state => state.tags);

  const { showLoading, closeLoading } = useLoading();
  const { showToastSuccess } = useToastSuccess();
  const { addFile } = useFile();
  const { doShowError } = useFormError();

  const handleFormCancel = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showLoading();

    // show error when the required fields are empty
    if (label == "" || file == undefined) {
      doShowError();
      closeLoading();
      return;
    }

    // upload file to the supabase storage
    const { data, error } = await supabase.storage
      .from("drive-box")
      .upload(`${label}`, file);

    // handle error (if any)
    if (error) {
      closeLoading();
      onClose();
      reset();
      return;
    }

    // save data in DB
    if (data) {
      const url = supabaseUrl + '/storage/v1/object/public/drive-box/' + data.path;
      const extension = file.type == "image/svg+xml" ? "svg" : file.type.split("/")[1];

      // construct new data
      const newFile: TFile = {
        label,
        url,
        extension,
        size: file.size,
        user_id: "851f138b-901e-4e6a-9186-e2a486e55cdf",
        tags: tags.reduce((acc, tag) => {
          if (acc == "") return tag.value;
          return acc + ";" + tag.value;
        }, "")
      }

      const {
        data: insertFileData,
        error: insertFileError
      } = await supabase
        .from("FILE")
        .insert([newFile])
        .select();

      if (insertFileError) {
        console.error("===== insertFileError:", insertFileError);
      }
      else {
        newFile.id = insertFileData[0].id;
        showToastSuccess("Upload success.", "The file has been successfully uploaded.");
        addFile(newFile);
      }
    }

    closeLoading();
    onClose();
    reset();
  }

  return { handleFormCancel, handleSubmit }
}

export default useFormUpload