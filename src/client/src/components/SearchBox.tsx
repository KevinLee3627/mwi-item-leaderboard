import { useState } from 'react';
import Select from 'react-select';

interface SearchBoxProps<T> {
  options?: T[];
  loading: boolean;
}

export function SearchBox<T>(props: SearchBoxProps<T>) {
  const [text, setText] = useState('');

  return (
    <div>
      <Select
        isSearchable
        options={props?.options}
        placeholder={props.loading ? 'Loading options...' : 'Search items'}
      />
    </div>
  );
}
