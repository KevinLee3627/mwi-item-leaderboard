import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Select from 'react-select';
import { GetAllAbilityMetadataRes } from 'server';
import { hridToDisplayName } from 'util/hridToDisplayName';

export interface Option<T> {
  label: string;
  value: T;
}

interface SearchBoxProps {
  options?: Option<GetAllAbilityMetadataRes[0]>[];
  loading: boolean;
}

export function AbilitySearchBox(props: SearchBoxProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useRef(new URLSearchParams(location.search.slice(1)));

  return (
    <div className='w-6/12 mx-auto flex-1 '>
      <Select
        isSearchable
        options={props?.options}
        defaultValue={{
          label: hridToDisplayName(
            hridToDisplayName(searchParams.current.get('abilityHrid') ?? '')
          ),
          value: {
            hrid: searchParams.current.get('abilityHrid'),
            displayName: hridToDisplayName(
              searchParams.current.get('abilityHrid') ?? ''
            ),
          },
        }}
        placeholder={props.loading ? 'Loading options...' : 'Search items'}
        onChange={(newValue) => {
          const searchParams = new URLSearchParams(location.search.slice(1));
          searchParams.set('abilityHrid', String(newValue?.value.hrid));
          navigate(`/leaderboard/ability?${searchParams.toString()}&limit=100`);
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
