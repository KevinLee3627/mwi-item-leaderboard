import { Dispatch, SetStateAction } from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/solid';
import { SortDirection } from 'components/Table';

export interface Header<T> {
  key: keyof T;
  label: string;
}

interface TableHeaderProps<T> {
  headers: Header<T>[];
  setActiveColumn: Dispatch<SetStateAction<keyof T>>;
  activeColumn: keyof T;
  setSortDirection: Dispatch<SetStateAction<SortDirection>>;
  sortDirection: SortDirection;
  cellClassName?: string;
  rowClassName?: string;
}

function chooseIcon<T>(
  currentColumn: keyof T,
  activeColumn: keyof T,
  direction: SortDirection
) {
  if (currentColumn !== activeColumn) {
    return <ChevronUpDownIcon className='pl-2 h-3 inline-block' />;
  }

  if (direction === 'asc') {
    return <ChevronUpIcon className=' pl-2 h-3 inline-block' />;
  } else {
    return <ChevronDownIcon className=' pl-2 h-3 inline-block' />;
  }
}

export function TableHeader<T>({
  headers,
  setActiveColumn,
  activeColumn,
  setSortDirection,
  sortDirection,
  cellClassName,
  rowClassName,
}: TableHeaderProps<T>) {
  return (
    <thead>
      <tr className={`${rowClassName}`}>
        {headers.map((header, i) => (
          <th
            key={i}
            className={`${cellClassName}`}
            onClick={() => {
              setSortDirection((prevState) => {
                return prevState === 'asc' ? 'desc' : 'asc';
              });
              setActiveColumn(header.key);
            }}
          >
            <span>{header.label}</span>
            {chooseIcon(header.key, activeColumn, sortDirection)}
          </th>
        ))}
      </tr>
    </thead>
  );
}
