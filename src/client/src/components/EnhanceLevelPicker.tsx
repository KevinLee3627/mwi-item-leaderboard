import { useEffect, useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import Select from 'react-select';
import { useSearchParams } from 'react-router-dom';
import { ItemLeaderboardLoaderData } from 'components/ItemLeaderboard';

export interface Option {
  label: string;
  value: number;
}

const allOption: Option = { label: 'all', value: -1 };

export function EnhanceLevelPicker() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { enhancementLevelData } = useLoaderData() as ItemLeaderboardLoaderData;

  const { current: defaultLevel } = useRef<number>(
    parseInt(searchParams.get('enhancementLevel') ?? '-1')
  );
  const [options, setOptions] = useState<Option[]>([allOption]);

  useEffect(() => {
    const availableLevels = enhancementLevelData.map(({ enhancementLevel }) => {
      return {
        label: `+${enhancementLevel.toString()}`,
        value: enhancementLevel,
      };
    });
    setOptions([allOption, ...availableLevels]);
  }, [enhancementLevelData]);

  return (
    <div className='w-2/12 mx-auto'>
      <Select
        isSearchable
        options={options}
        defaultValue={{
          label: defaultLevel === -1 ? allOption.label : `+${defaultLevel}`,
          value: defaultLevel,
        }}
        placeholder={''}
        onChange={(newValue) => {
          // Take the current search params, replace the enhancementLevel
          searchParams.set('enhancementLevel', String(newValue?.value));
          navigate(`/leaderboard/item?${searchParams.toString()}`);
        }}
        styles={{
          option: (base) => ({
            ...base,
            color: 'black',
          }),
        }}
      />
    </div>
  );
}
