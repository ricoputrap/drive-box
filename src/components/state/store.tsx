import { TFile } from "@/types/file.types";
import { create } from "zustand";
import { BaseState, BaseAction } from "./index.types";

const useBaseStore = create<BaseState & BaseAction>((set, get) => ({
  // state
  searchValue: "",
  files: [],
  loading: false,
  types: [],
  tags: [],

  // actions
  setSearchValue: (value: string) => set({ searchValue: value }),
  setFiles: (files: any) => set({ files }),
  getFiles: () => {
    const files: TFile[] = get().files;

    const filteredFiles: TFile[] = files.filter(file => {
      const searchValue = get().searchValue;
      const label = file.label.toLowerCase();
      const extension = file.extension.toLowerCase();
      const value = searchValue.toLowerCase();

      const types = get().types;
      const typesValues = types.map(type => type.value);
      if (typesValues.length > 0 && !typesValues.includes(extension)) return false;

      if (label.includes(value) || extension.includes(value)) return true;
      return false;
    });

    filteredFiles.reverse();
    return filteredFiles;
  },
  addFile: (file: TFile) => set(state => ({ files: [...state.files, file] })),
  setLoading: (value: boolean) => set({ loading: value }),
  setTypes: (types) => set({ types }),
  setTags: (tags) => set({ tags }),
}));

export default useBaseStore;