import { TOption } from "@/types/file.types";
import { MultiValue } from "react-select";

export interface UploadState {
  label: string;
  file?: File;
  tags: MultiValue<TOption>;
  showError: boolean;
}

export interface UploadAction {
  setLabel: (label: string) => void;
  setFile: (file: File) => void;
  setTags: (tags: MultiValue<TOption>) => void;
  setShowError: (showError: boolean) => void;
  reset: () => void;
}