import React from 'react'
import Filter from '../Filter';
import useFilter from './useFilter'

const FilterTags: React.FC = () => {
  const { tags, handleTagsChange } = useFilter();

  return (
    <Filter
      label="tags"
      values={ tags }
      handleChange={ handleTagsChange }
      options={[]}
    />
  )
}

export default FilterTags