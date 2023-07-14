import { ChangeEvent } from 'react';

interface CheckboxProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => unknown;
  id: string;
  label: string;
  defaultChecked?: boolean;
}

export function Checkbox({
  id,
  label,
  handleChange,
  defaultChecked = false,
}: CheckboxProps) {
  return (
    <div className='form-control'>
      <label className='label cursor-pointer'>
        <span className='label-text mr-4'>{label}</span>
        <input
          type='checkbox'
          id={id}
          className='checkbox'
          onChange={handleChange}
          defaultChecked={defaultChecked}
        />
      </label>
    </div>
  );
}
