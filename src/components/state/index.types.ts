import { TFile, TOption } from "@/types/file.types";
import { MultiValue } from "react-select";

export interface BaseState {
  searchValue: string;
  files: TFile[];
  loading: boolean;
  types: MultiValue<TOption>;
}

export interface BaseAction {
  setSearchValue: (value: string) => void;
  setFiles: (files: TFile[]) => void;
  getFiles: () => TFile[];
  addFile: (file: TFile) => void;
  setLoading: (loading: boolean) => void;
  setTypes: (types: MultiValue<TOption>) => void;
}