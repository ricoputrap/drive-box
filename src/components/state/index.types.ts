import { TFile } from "@/types/file.types";

export interface BaseState {
  searchValue: string;
  files: TFile[];
  loading: boolean;
}

export interface BaseAction {
  setSearchValue: (value: string) => void;
  setFiles: (files: TFile[]) => void;
  getFiles: () => TFile[];
  addFile: (file: TFile) => void;
  setLoading: (loading: boolean) => void;
}