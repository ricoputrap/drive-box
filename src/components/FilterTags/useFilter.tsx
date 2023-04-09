import { TOption } from '@/types/file.types';
import { ActionMeta, MultiValue } from 'react-select';
import useBaseStore from '../state/store'

const useFilter = () => {
  const tags = useBaseStore(state => state.tags);
  const setTags = useBaseStore(state => state.setTags);

  const handleTagsChange = (newValue: MultiValue<TOption>, actionMeta: ActionMeta<TOption>) => {
    switch (actionMeta.action) {
      case "remove-value":
        const { removedValue } = actionMeta;
        const updatedTags: MultiValue<TOption> = tags.filter(tag => tag.value !== removedValue.value);
        setTags(updatedTags);
        break;

      default:
        const lastNewValue = newValue[newValue.length - 1];
        setTags([...tags, lastNewValue]);
    }
  }

  return { tags, handleTagsChange }
}

export default useFilter