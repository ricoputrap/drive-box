import FILE_TYPES from "@/constants/file-types";
import { TOption } from "@/types/file.types";

export const getFileTypeOptions = (): TOption[] => {
  const options: TOption[] = FILE_TYPES.map(type => ({
    value: type,
    label: type.toUpperCase()
  }));

  return options;
}