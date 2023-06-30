import { SearchBox } from '../components/ItemSearchBox';
import { useFetch } from '../hooks/useFetch';
import { EnhanceLevelPicker } from '../components/EnhanceLevelPicker';
import { ApiRes } from '../types/ApiRes';
import { Header } from '../components/Header';
import { Outlet } from 'react-router';
import { ItemMetadata } from '../components/ItemSearchBox';

export interface Option<T> {
  label: string;
  value: T;
}

export function Home() {
  const { data, loading } = useFetch<ApiRes<ItemMetadata>>({
    url: `${import.meta.env.VITE_API_BASE}/api/v1/items`,
    method: 'GET',
  });

  return (
    <div className='w-full h-full mx-auto'>
      <Header />
      <p className='text-center'>
        <strong>
          To add your items here, whisper Granttank2 in game with your items
          linked in chat!
        </strong>
      </p>
      <div className='flex w-6/12 mx-auto'>
        <SearchBox
          options={data?.results
            .map((item) => {
              return {
                value: item,
                label: `${item.displayName}`,
              };
            })
            .sort((a, b) => a.label.localeCompare(b.label))}
          loading={loading}
        />
        <EnhanceLevelPicker />
      </div>
      <Outlet />
    </div>
  );
}
