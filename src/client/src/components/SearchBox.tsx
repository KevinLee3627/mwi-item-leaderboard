import { Dispatch, SetStateAction } from 'react';
import Select from 'react-select';
import { ItemMetadata, Option } from '../App';

interface SearchBoxProps {
  options?: Option<ItemMetadata>[];
  loading: boolean;
  setSelected: Dispatch<
    SetStateAction<Option<ItemMetadata> | undefined | null>
  >;
}

export function SearchBox(props: SearchBoxProps) {
  return (
    <div className='w-6/12 mx-auto '>
      <Select
        isSearchable
        options={props?.options}
        placeholder={props.loading ? 'Loading options...' : 'Search items'}
        onChange={(newValue) => {
          props.setSelected(newValue);
        }}
        styles={{
          option: (base) => {
            return {
              ...base,
              color: 'black',
            };
          },
        }}
      />
    </div>
  );
}
