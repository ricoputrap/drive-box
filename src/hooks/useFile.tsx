import useBaseStore from '@/components/state/store'
import React from 'react'

const useFile = () => {
  const addFile = useBaseStore(state => state.addFile);

  return { addFile }
}

export default useFile