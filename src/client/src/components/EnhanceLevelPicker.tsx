import { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router';
import Select from 'react-select';
import { useSearchParams } from 'react-router-dom';
import { ItemLeaderboardLoaderData } from 'components/ItemLeaderboard';

export interface Option {
  label: string;
  value: number;
}

const allOption: Option = { value: -1, label: 'all' };

export function EnhanceLevelPicker() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { enhancementLevelData } = useLoaderData() as ItemLeaderboardLoaderData;

  const [defaultLevel, setDefaultLevel] = useState<Option | null | undefined>();

  const [options, setOptions] = useState<Option[]>([allOption]);

  // Set the picker value to all on page start
  useEffect(() => {
    setDefaultLevel(allOption);
    const enhancementLevel = searchParams.get('enhancementLevel');
    if (enhancementLevel == null) return;

    if (parseInt(enhancementLevel) === -1) {
      setDefaultLevel(allOption);
    } else {
      const lvl = parseInt(enhancementLevel, 10);
      setDefaultLevel({ value: lvl, label: String(enhancementLevel) });
    }
  }, [searchParams]);

  useEffect(() => {
    const availableLevels =
      enhancementLevelData.map(({ enhancementLevel }) => {
        return {
          label: `+${enhancementLevel.toString()}`,
          value: enhancementLevel,
        };
      }) ?? [];
    setOptions([allOption, ...availableLevels]);
  }, [enhancementLevelData]);

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
