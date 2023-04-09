import { TFile } from "@/types/file.types";
import { create } from "zustand";
import { SIZE_10_MB } from "../FilterSize/utils";
import { BaseState, BaseAction } from "./index.types";

const useBaseStore = create<BaseState & BaseAction>((set, get) => ({
  // state
  searchValue: "",
  files: [],
  loading: false,
  types: [],
  tags: [],
  sizeRange: [0, SIZE_10_MB],

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
      const fileTags = file.tags?.split(";") || [];

      // filter by type
      const types = get().types;
      const typesValues = types.map(type => type.value);
      if (typesValues.length > 0 && !typesValues.includes(extension)) return false;

      // filter by tags
      const tags = get().tags;
      const tagsValues = tags.map(tag => tag.value);
      if (tagsValues.length > 0) {
        const hasTag = fileTags.some(tag => tagsValues.includes(tag));
        if (!hasTag) return false;
      }

      // filter by search
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
  setSizeRange: (sizeRange) => set({ sizeRange }),
}));

export default useBaseStore;