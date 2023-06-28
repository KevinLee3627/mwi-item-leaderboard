import { Leaderboard } from '../components/Leaderboard';
import { SearchBox } from '../components/SearchBox';
import { useFetch } from '../hooks/useFetch';
import { GetItemLeaderboardReturn } from 'server';
import { useState } from 'react';
import { Changelog } from '../components/Changelog';
import { EnhanceLevelPicker } from '../components/EnhanceLevelPicker';

export interface Option<T> {
  label: string;
  value: T;
}

export interface ItemMetadata {
  hrid: string;
  displayName: string;
  enhancementLevel: number;
}

interface Res<T> {
  message: string;
  results: T[];
}

export function Home() {
  const [selected, setSelected] = useState<Option<ItemMetadata> | null>();
  const [enhanceLevel, setEnhanceLevel] = useState<Option<number> | null>();

  const { data, loading } = useFetch<Res<ItemMetadata>>({
    url: `${import.meta.env.VITE_API_BASE}/api/v1/items`,
    method: 'GET',
  });

  const { data: leaderboardData } = useFetch<Res<GetItemLeaderboardReturn>>({
    url: `${import.meta.env.VITE_API_BASE as string}/api/v1/item?itemHrid=${
      selected?.value.hrid
    }&enhancementLevel=${enhanceLevel?.value ?? 0}&limit=10`,
    method: 'GET',
  });

  return (
    <div className='w-8/12 h-full mx-auto'>
      <h1 className='text-2xl text-center'>MWI Item Leaderboard</h1>
      <div>
        <p className='text-center'>v0.2</p>
        <Changelog />
      </div>
      <p className='text-center'>
        Contact Granttank on Discord or Granttank2 in-game for
        suggestions/issues
      </p>
      <p className='text-center'>
        <strong>
          To add your items here, whisper Granttank2 in game with your items
          linked in chat!
        </strong>
      </p>
      <div className='flex w-6/12 mx-auto'>
        <SearchBox
          options={data?.results
            .filter((item) => item.enhancementLevel === 0)
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
      <Leaderboard data={leaderboardData?.results ?? []} />
    </div>
  );
}
