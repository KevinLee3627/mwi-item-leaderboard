import { Dispatch, SetStateAction, useEffect } from 'react';
import Select from 'react-select';

export interface Option {
  label: string;
  value: number | string;
}

interface EnhanceLevelPickerProps {
  setSelected: Dispatch<SetStateAction<Option | null | undefined>>;
}

export function EnhanceLevelPicker({ setSelected }: EnhanceLevelPickerProps) {
  const options = [
    { label: 'all', value: 'all' },
    ...Array(21)
      .fill(0)
      .map((_, i) => ({ value: i, label: `+${i}` })),
  ];

  // Set the picker value to all on page start
  useEffect(() => {
    setSelected({ label: 'all', value: 'all' });
  }, [setSelected]);

  return (
    <div className='w-2/12 mx-auto'>
      <Select
        isSearchable
        options={options}
        defaultValue={options[0]}
        placeholder={'Enhancement level'}
        onChange={(newValue) => {
          setSelected(newValue);
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
