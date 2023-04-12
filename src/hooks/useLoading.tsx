import useBaseStore from '@/components/state/store'
import React from 'react'

const useLoading = () => {
  const setLoading = useBaseStore(state => state.setLoading);

  const showLoading = () => setLoading(true);
  const closeLoading = () => setLoading(false);

  return { showLoading, closeLoading };
}

export default useLoading