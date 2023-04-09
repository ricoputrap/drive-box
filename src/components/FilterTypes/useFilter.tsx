import { TOption } from '@/types/file.types';
import { ActionMeta, MultiValue } from 'react-select';
import useBaseStore from '../state/store';

const useFilter = () => {
  const types = useBaseStore(state => state.types);
  const setTypes = useBaseStore(state => state.setTypes);

  const handleTypesChange = (newValue: MultiValue<TOption>, actionMeta: ActionMeta<TOption>) => {
    switch (actionMeta.action) {
      case "remove-value":
        const { removedValue } = actionMeta;
        const updatedTags: MultiValue<TOption> = types.filter(type => type.value !== removedValue.value);
        setTypes(updatedTags);
        break;

      default:
        const lastNewValue = newValue[newValue.length - 1];
        setTypes([...types, lastNewValue]);
    }
  }

  return { types, handleTypesChange }
}

export default useFilter