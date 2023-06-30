import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Select from 'react-select';
import { hridToDisplayName } from '../util/hridToDisplayName';

export interface Option<T> {
  label: string;
  value: T;
}

export interface ItemMetadata {
  hrid: string;
  displayName: string;
  enhancementLevel: number;
}

interface SearchBoxProps {
  options?: Option<ItemMetadata>[];
  loading: boolean;
}

export function ItemSearchBox(props: SearchBoxProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useRef(new URLSearchParams(location.search.slice(1)));

  return (
    <div className='w-6/12 mx-auto flex-1 '>
      <Select
        isSearchable
        options={props?.options}
        defaultValue={{
          label: hridToDisplayName(searchParams.current.get('itemHrid') ?? ''),
          value: {
            hrid: searchParams.current.get('itemHrid'),
            displayName: hridToDisplayName(
              searchParams.current.get('itemHrid') ?? ''
            ),
            enhancementLevel: parseInt(
              searchParams.current.get('enhancementLevel') ?? '0'
            ),
          },
        }}
        placeholder={props.loading ? 'Loading options...' : 'Search items'}
        onChange={(newValue) => {
          const searchParams = new URLSearchParams(location.search.slice(1));
          if (searchParams.size > 0) {
            searchParams.set('itemHrid', String(newValue?.value.hrid));
            // Take the current location, replace the enhancementLevel
            navigate(`/leaderboard?${searchParams.toString()}`);
          } else {
            navigate(
              `/leaderboard?itemHrid=${newValue?.value.hrid}&enhancementLevel=all&limit=100`
            );
          }
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
