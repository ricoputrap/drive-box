import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    fonts: {
      body: `'Lato', sans-serif`
    },
    colors: {
      primaryBlue: "#5053D9",
      primaryBlueHovered: "#8082E4",

      backgroundPrimary: "#ECEFF6",
      backgroundSecondary: "#F0F0F0",
      textPrimary: "#333333",
      borderBold: "#BDBDBD",
      borderSoft: "#D0D0D0"
    }
  });

  return (
    <ChakraProvider theme={ theme }>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
