import { extendTheme } from "@chakra-ui/react";

// Extiende el tema para incluir la nueva fuente
const theme = extendTheme({
  fonts: {
    heading: `'Work Sans', sans-serif`,
    body: `'Work Sans', sans-serif`,
  },
});

export default theme;
