import { Dispatch, SetStateAction } from 'react';
import Select from 'react-select';

export interface Option {
  label: string;
  value: string;
}

interface SearchBoxProps {
  options: Option[];
  loading: boolean;
  setSelected: Dispatch<SetStateAction<Option | undefined | null>>;
}

export function SearchBox(props: SearchBoxProps) {
  return (
    <div>
      <Select
        isSearchable
        options={props?.options}
        placeholder={props.loading ? 'Loading options...' : 'Search items'}
        onChange={(newValue) => {
          props.setSelected(newValue);
        }}
      />
    </div>
  );
}
