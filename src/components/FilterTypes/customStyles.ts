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
  control: (provided, state) => ({
    ...provided,
    minHeight: "68px",
    alignItems: "start",
    padding: "4px 0"
  })
}

export default customStyles;