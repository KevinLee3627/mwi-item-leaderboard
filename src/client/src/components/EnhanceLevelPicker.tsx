import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Select from 'react-select';
import { useFetch } from '../hooks/useFetch';
import { ItemMetadata } from './ItemSearchBox';
import { ApiRes } from '../types/ApiRes';
import { useSearchParams } from 'react-router-dom';

export interface Option {
  label: string;
  value: number | string;
}

export function EnhanceLevelPicker() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [defaultLevel, setDefaultLevel] = useState<Option | null | undefined>();

  const [options, setOptions] = useState<Option[]>([
    { value: 'all', label: 'all' },
  ]);

  // Set the picker value to all on page start
  useEffect(() => {
    setDefaultLevel({ label: 'all', value: 'all' });
    const enhancementLevel = searchParams.get('enhancementLevel');
    if (enhancementLevel == null) return;

    if (enhancementLevel === 'all') {
      setDefaultLevel({ value: 'all', label: 'all' });
      return;
    }

    const lvl = parseInt(enhancementLevel, 10);
    setDefaultLevel({ value: lvl, label: String(enhancementLevel) });
  }, [searchParams]);

  // Only allow users to pick enhancement levels that exist
  const { data: levelData } = useFetch<ApiRes<ItemMetadata>>({
    url: `${
      import.meta.env.VITE_API_BASE
    }/api/v1/item?itemHrid=${searchParams.get('itemHrid')}`,
    method: 'GET',
  });

  useEffect(() => {
    const all: Option = { label: 'all', value: 'all' };
    const availableLevels =
      levelData?.results.map(({ enhancementLevel }) => {
        return {
          label: `+${enhancementLevel.toString()}`,
          value: enhancementLevel,
        };
      }) ?? [];
    setOptions([...availableLevels, all]);
  }, [levelData?.results]);

  return (
    <div className='w-2/12 mx-auto'>
      <Select
        isSearchable
        options={options}
        defaultValue={{
          label: searchParams.get('enhancementLevel'),
          value: defaultLevel?.value,
        }}
        placeholder={'Enhancement level'}
        onChange={(newValue) => {
          const searchParams = new URLSearchParams(location.search.slice(1));

          searchParams.set('enhancementLevel', String(newValue?.value));
          // Take the current location, replace the enhancementLevel
          navigate(`/leaderboard/item?${searchParams.toString()}`);
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
