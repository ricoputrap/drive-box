import { useToast } from '@chakra-ui/react'
import React, { useCallback } from 'react'

const useToastSuccess = () => {
  const toast = useToast();

  const showToastSuccess = useCallback((title: string, description: string) => {
    toast({
      title,
      description,
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
  }, [toast]);

  return { showToastSuccess }
}

export default useToastSuccess;