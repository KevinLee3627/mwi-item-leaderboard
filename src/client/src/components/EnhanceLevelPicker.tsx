import { Dispatch, SetStateAction } from 'react';
import Select from 'react-select';

export interface Option {
  label: string;
  value: number;
}

interface EnhanceLevelPickerProps {
  setSelected: Dispatch<SetStateAction<Option | null | undefined>>;
}

const options = Array(21)
  .fill(0)
  .map((_, i) => ({ value: i, label: `+${i}` }));

export function EnhanceLevelPicker(props: EnhanceLevelPickerProps) {
  return (
    <div className='w-2/12 mx-auto '>
      <Select
        isSearchable
        options={options}
        defaultValue={{ label: '+0', value: 0 }}
        placeholder={'Enhancement level'}
        onChange={(newValue) => {
          props.setSelected(newValue);
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
