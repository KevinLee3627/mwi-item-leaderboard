import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Select from 'react-select';
import { useSearchParams } from 'react-router-dom';
import { GetItemMetadataRes } from 'server';
import { useFetch } from 'hooks/useFetch';

export interface Option {
  label: string;
  value: number;
}

export function EnhanceLevelPicker() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [defaultLevel, setDefaultLevel] = useState<Option | null | undefined>();

  const [options, setOptions] = useState<Option[]>([
    { value: -1, label: 'all' },
  ]);

  // Set the picker value to all on page start
  useEffect(() => {
    setDefaultLevel({ label: 'all', value: -1 });
    const enhancementLevel = searchParams.get('enhancementLevel');
    if (enhancementLevel == null) return;

    if (parseInt(enhancementLevel) === -1) {
      setDefaultLevel({ value: -1, label: 'all' });
      return;
    }

    const lvl = parseInt(enhancementLevel, 10);
    setDefaultLevel({ value: lvl, label: String(enhancementLevel) });
  }, [searchParams]);

  // Only allow users to pick enhancement levels that exist
  const { data: levelData } = useFetch<GetItemMetadataRes>({
    url: `${
      import.meta.env.VITE_API_BASE
    }/api/v1/item?itemHrid=${searchParams.get('itemHrid')}`,
    method: 'GET',
  });

  useEffect(() => {
    const all: Option = { label: 'all', value: -1 };
    const availableLevels =
      levelData?.map(({ enhancementLevel }) => {
        return {
          label: `+${enhancementLevel.toString()}`,
          value: enhancementLevel,
        };
      }) ?? [];
    setOptions([...availableLevels, all]);
  }, [levelData]);

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
