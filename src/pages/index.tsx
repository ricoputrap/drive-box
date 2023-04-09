import supabase from '@/clients/supabase'
import BoxLogo from '@/components/BoxLogo'
import Files from '@/components/Files'
import FilterTypes from '@/components/FilterTypes'
import Loading from '@/components/Loading'
import useBaseStore from '@/components/state/store'
import TopMenuContainer from '@/components/TopMenuContainer'
import { TFile } from '@/types/file.types'
import { Box, Flex, Stack } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'

interface Props {
  files: TFile[];
}
const Home: NextPage<Props> = ({ files }) => {
  const setFiles = useBaseStore(state => state.setFiles);
  useEffect(() => {
    setFiles(files);
  }, [files, setFiles]);

  return (
    <>
      <Head>
        <title>DriveBox</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      
      <main>
        <Loading />
        <Box color="textPrimary" background="backgroundPrimary" padding="40px">
          <Flex columnGap="20px">
            <Stack rowGap="20px">
              <BoxLogo />
              <FilterTypes />
            </Stack>
          
            <Stack rowGap="20px">
              <TopMenuContainer />
              <Files />
            </Stack>
          </Flex>
        </Box>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const userId = "851f138b-901e-4e6a-9186-e2a486e55cdf";
  const { data, error } = await supabase.from("FILE").select("*").eq("user_id", userId);

  if (error) {
    console.error("===== getAllFIles error =====", error);
  }

  return {
    props: {
      files: data
    }
  }
}

export default Home;