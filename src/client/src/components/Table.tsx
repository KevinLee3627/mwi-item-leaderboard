import { useState } from 'react';
import { Header, TableHeader } from './TableHeader';

interface TableProps<T extends object> {
  data: T[];
  headers: Header<T>[];
  defaultColumn: keyof T;
  row: (item: T, i: number) => JSX.Element;
}

function sortData<T>(data: T[], column: keyof T, dir: SortDirection = 'desc') {
  const locale = navigator?.language ?? 'en';
  const directionNum = dir === 'desc' ? 1 : -1;
  const sorted = data.sort((a, b) => {
    return (
      String(a[column]).localeCompare(String(b[column]), locale, {
        numeric: true,
      }) * directionNum
    );
  });
  return sorted;
}

export type SortDirection = 'asc' | 'desc';

export function Table<T extends object>({
  data,
  headers,
  row,
  defaultColumn,
}: TableProps<T>) {
  const [activeColumn, setActiveColumn] = useState<keyof T>(defaultColumn);
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  return (
    <>
      <table className='table table-zebra mx-auto w-6/12'>
        <TableHeader
          setActiveColumn={setActiveColumn}
          activeColumn={activeColumn}
          setSortDirection={setSortDirection}
          sortDirection={sortDirection}
          headers={headers}
          cellClassName='p-2'
          rowClassName='text-left p-4 text-white sticky top-0 bg-neutral'
        />
        <tbody>
          {activeColumn &&
            sortData(data, activeColumn, sortDirection).map((entry, i) =>
              row(entry, i)
            )}
        </tbody>
      </table>
    </>
  );
}
