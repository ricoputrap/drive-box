import { Box, Flex, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text } from '@chakra-ui/react'
import React from 'react'
import useRange from './useRange';

const FilterSize: React.FC = () => {
  const { range, handleChange, minLabel, maxLabel } = useRange();

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

      <RangeSlider value={ range } onChange={ handleChange }>
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