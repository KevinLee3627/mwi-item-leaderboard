import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { hridToDisplayName } from 'util/hridToDisplayName';

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
  loading?: boolean;
}

export function ItemSearchBox(props: SearchBoxProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { current: itemHrid } = useRef(searchParams.get('itemHrid'));

  return (
    <div className='w-6/12 mx-auto flex-1 '>
      <Select
        isSearchable
        options={props?.options}
        defaultValue={{
          label: hridToDisplayName(itemHrid ?? ''),
          value: {
            hrid: itemHrid,
            displayName: hridToDisplayName(itemHrid ?? ''),
            enhancementLevel: parseInt(
              searchParams.get('enhancementLevel') ?? '0'
            ),
          },
        }}
        placeholder={props.loading ? 'Loading options...' : 'Search items'}
        onChange={(newValue) => {
          searchParams.set('itemHrid', String(newValue?.value.hrid));
          const enhancementLevel = searchParams.get('enhancementLevel') ?? -1;
          const nextUrl = `/leaderboard/item?itemHrid=${newValue?.value.hrid}&enhancementLevel=${enhancementLevel}&limit=100`;
          navigate(nextUrl);
        }}
        styles={{ option: (base) => ({ ...base, color: 'black' }) }}
      />
    </div>
  );
}
