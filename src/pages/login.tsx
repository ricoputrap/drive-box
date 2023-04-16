import Logo from '@/components/reusables/Logo'
import { Box, Card, Flex, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import LoginImage from "@/assets/undraw-camera-images.svg"
import Image from 'next/image'
import LoginCard from '@/components/LoginCard'

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>DriveBox</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main>
        <Box
          background="primaryBlue"
          minHeight="100vh"
          padding="40px"
        >
          <Box position="absolute" left="20px" top="20px">
            <Logo
              textColor="white"
              logoColor="white"
            />
          </Box>

          <Flex
            justifyContent="space-around"
            alignItems="center"
            wrap="wrap"
            width="100%"
            minHeight="90vh"
          >
            <Box width="426px" display={{
              base: "none",
              lg: "block"
            }}>
              <Image src={LoginImage} alt="login-image" />
            </Box>

            <Box width="426px">
              <LoginCard />
            </Box>
          </Flex>
        </Box>
      </main>
    </>
  )
}

export default Login