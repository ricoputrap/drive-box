import { TOption } from "@/types/file.types";
import { MultiValue } from "react-select";
import { create } from "zustand";
import { UploadState, UploadAction } from "./index.types";

const useUploadStore = create<UploadState & UploadAction>((set, get) => ({
  label: "",
  file: undefined,
  tags: [],
  showError: false,

  setLabel: (label: string) => set({ label }),
  setFile: (file: File) => set({ file }),
  setTags: (tags: MultiValue<TOption>) => set({ tags }),
  setShowError: (showError: boolean) => set({ showError }),
}));

export default useUploadStore;