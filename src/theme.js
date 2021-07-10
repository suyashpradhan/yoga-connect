import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    primary: "#0f0f13",
    secondary: "#1a1c20",
    ternary: "#35383c",
    white: "#FFFFFF",
    offWhite: "#9f9fa1",
    button: "#1877f2",
    danger: "#ff0000",
  },
};

const fonts = {
  default: {
    heading: "Inter",
  },
};

export const theme = extendTheme({ colors, fonts });
