import { Leaderboard } from '../components/Leaderboard';
import { SearchBox } from '../components/SearchBox';
import { useFetch } from '../hooks/useFetch';
import { GetItemLeaderboardReturn } from 'server';
import { useState } from 'react';
import { EnhanceLevelPicker } from '../components/EnhanceLevelPicker';
import { ApiRes } from '../types/ApiRes';
import { Header } from '../components/Header';

export interface Option<T> {
  label: string;
  value: T;
}

export interface ItemMetadata {
  hrid: string;
  displayName: string;
  enhancementLevel: number;
}

export function Home() {
  const [selected, setSelected] = useState<Option<ItemMetadata> | null>();
  const [enhanceLevel, setEnhanceLevel] = useState<Option<
    number | string
  > | null>();

  const { data, loading } = useFetch<ApiRes<ItemMetadata>>({
    url: `${import.meta.env.VITE_API_BASE}/api/v1/items`,
    method: 'GET',
  });

  console.log(enhanceLevel);

  const { data: leaderboardData } = useFetch<ApiRes<GetItemLeaderboardReturn>>({
    url: `${import.meta.env.VITE_API_BASE as string}/api/v1/item?itemHrid=${
      selected?.value.hrid
    }&enhancementLevel=${enhanceLevel?.value ?? 0}&limit=10`,
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
                label: `${item.displayName} `,
              };
            })
            .sort((a, b) => a.label.localeCompare(b.label))}
          loading={loading}
          setSelected={setSelected}
        />
        <EnhanceLevelPicker setSelected={setEnhanceLevel} />
      </div>
      {selected && <Leaderboard data={leaderboardData?.results ?? []} />}
    </div>
  );
}
