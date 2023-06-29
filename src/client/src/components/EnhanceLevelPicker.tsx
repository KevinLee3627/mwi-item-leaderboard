import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Select from 'react-select';

export interface Option {
  label: string;
  value: number | string;
}

export function EnhanceLevelPicker() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useRef(new URLSearchParams(location.search.slice(1)));

  const [defaultLevel, setDefaultLevel] = useState<Option | null | undefined>();

  const options = [
    { value: 'all', label: 'all' },
    ...Array(21)
      .fill(0)
      .map((_, i) => ({ value: i, label: `+${i}` })),
  ];

  // Set the picker value to all on page start
  useEffect(() => {
    setDefaultLevel({ label: 'all', value: 'all' });
    const enhancementLevel = searchParams.current.get('enhancementLevel');
    if (enhancementLevel == null) return;

    if (enhancementLevel === 'all') {
      setDefaultLevel({ value: 'all', label: 'all' });
      return;
    }

    const lvl = parseInt(enhancementLevel, 10);
    setDefaultLevel({ value: lvl, label: String(enhancementLevel) });
  }, []);

  return (
    <div className='w-2/12 mx-auto'>
      <Select
        isSearchable
        options={options}
        defaultValue={{
          label: searchParams.current.get('enhancementLevel'),
          value: defaultLevel?.value,
        }}
        placeholder={'Enhancement level'}
        onChange={(newValue) => {
          const searchParams = new URLSearchParams(location.search.slice(1));

          searchParams.set('enhancementLevel', String(newValue?.value));
          // Take the current location, replace the enhancementLevel
          navigate(`/mwi-item-leaderboard/item?${searchParams.toString()}`);
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
