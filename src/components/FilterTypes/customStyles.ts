import { TOption } from "@/types/file.types";
import { StylesConfig } from "react-select";

const customStyles: StylesConfig<TOption, true, never> | undefined = {
  option: (provided, state) => ({
    ...provided,
    textTransform: "uppercase",
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    textTransform: "uppercase",
  }),
}

export default customStyles;