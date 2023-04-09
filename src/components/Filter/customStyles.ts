import { TOption } from "@/types/file.types";
import { StylesConfig } from "react-select";

export const getCustomStyles = (isUppercase: boolean) => {
  const styles: StylesConfig<TOption, true, never> | undefined = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "68px",
      alignItems: "start",
      padding: "4px 0"
    })
  };

  if (isUppercase) {
    styles.option = (provided, state) => ({
      ...provided,
      textTransform: "uppercase",
    });
    styles.multiValueLabel = (provided, state) => ({
      ...provided,
      textTransform: "uppercase",
    });
  }

  return styles;
}