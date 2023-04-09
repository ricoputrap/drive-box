import { Box, Flex, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { getBytesFromPercentage, getFormattedLabel, SIZE_5_MB } from './utils';

const FilterSize: React.FC = () => {
  const [value, setValue] = React.useState<number[]>([10, 90]);

  const [min, max]: number[] = useMemo(() => {
    const min = getBytesFromPercentage(value[0], SIZE_5_MB);
    const max = getBytesFromPercentage(value[1], SIZE_5_MB);
    return [min, max];
  }, [value]);

  const minLabel: string = useMemo(() => {
    const label = getFormattedLabel(min);
    return label;
  }, [min]);

  const maxLabel: string = useMemo(() => {
    const label = getFormattedLabel(max);
    return label;
  }, [max]);

  return (
    <Box padding="20px" background="white" borderRadius="10px">
      <Text
        fontSize="20px"
        fontWeight={700}
        marginBottom="10px"
        textTransform="uppercase"
      >
        Size
      </Text>

      <Flex justifyContent="space-between">
        <Text fontSize="14px" fontWeight={700} marginRight="10px">
          { minLabel }
        </Text>
        <Text fontSize="14px" fontWeight={700} marginRight="10px">
          { maxLabel }
        </Text>
      </Flex>

      <RangeSlider defaultValue={[10, 90]} onChange={newValue => setValue(newValue)}>
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </Box>
  )
}

export default FilterSize