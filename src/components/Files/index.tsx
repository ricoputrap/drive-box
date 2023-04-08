import { Box, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Img1 from "../../assets/img-1.jpg"
import FileItem from '../FileItem'
import supabase from "../../clients/supabase";

const Files: React.FC = () => {
  useEffect(() => {
    const getAllFiles = async () => {
      const userId = "851f138b-901e-4e6a-9186-e2a486e55cdf";
      const { data, error } = await supabase.from("FILE").select("*").eq("user_id", userId);

      if (error) {
        console.error("===== getAllFIles error =====", error);
      }
      else {
        console.log("===== getAllFIles data =====", data);
      }
    }
    getAllFiles();
  }, [])

  return (
    <Box padding="20px" background="white" borderRadius="10px">
      <Stack>

        {/* FILES CONTENT */}
        <FileItem
          img={Img1}
          label="Hiking in Arizona"
        />

        {/* PAGINATION */}
      </Stack>
    </Box>
  )
}

export default Files