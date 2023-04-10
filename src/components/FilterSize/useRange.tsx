import React, { useMemo, useState } from 'react'
import useBaseStore from '../state/store'
import { getBytesFromPercentage, getFormattedLabel, SIZE_10_MB } from './utils';

const useRange = () => {
  const sizeRange = useBaseStore(state => state.sizeRange);
  const setSizeRange = useBaseStore(state => state.setSizeRange);
  const [range, setRange] = useState<number[]>(sizeRange);

  const handleChange = (newRange: number[]) => {
    setRange(newRange);

    const minBytes = getBytesFromPercentage(newRange[0], SIZE_10_MB);
    const maxBytes = getBytesFromPercentage(newRange[1], SIZE_10_MB);
    setSizeRange([minBytes, maxBytes]);
  }

  const [minLabel, maxLabel] = useMemo<string[]>(() => {
    const min = getFormattedLabel(sizeRange[0]);
    const max = getFormattedLabel(sizeRange[1]);
    return [min, max];
  }, [sizeRange]);

  return { range, handleChange, minLabel, maxLabel };
}

export default useRange