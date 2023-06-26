import './App.css';
import { Leaderboard } from './components/Leaderboard';
import { Option, SearchBox } from './components/SearchBox';
import { useFetch } from './hooks/useFetch';
import { GetItemLeaderboardReturn } from 'server';
import { useState } from 'react';

export interface ItemMetadata {
  hrid: string;
  displayName: string;
  enhancementLevel: string;
}

interface Res<T> {
  message: string;
  results: T[];
}

function App() {
  const [selected, setSelected] = useState<Option | null>();

  const { data, loading } = useFetch<Res<ItemMetadata>>({
    url: `${import.meta.env.VITE_API_BASE}/api/v1/items`,
    method: 'GET',
  });

  const { data: coinData } = useFetch<Res<GetItemLeaderboardReturn>>({
    url: `${import.meta.env.VITE_API_BASE as string}/api/v1/item?itemHrid=${
      selected?.value
    }&limit=5`,
    method: 'GET',
  });

  console.log(coinData);

  return (
    <>
      <h1 className='text-2xl text-center'>MWI Item Leaderboard</h1>
      <p className='text-center'>v0.1</p>
      <p className='text-center'>
        Contact Granttank on Discord for suggestions or issues
      </p>
      <SearchBox
        options={
          data
            ? data.results.map((itemMetadata) => {
                return {
                  value: itemMetadata.hrid,
                  label: itemMetadata.displayName,
                };
              })
            : []
        }
        loading={loading}
        setSelected={setSelected}
      />
      <p>
        selected {selected?.label}, {selected?.value}
      </p>
      <Leaderboard data={coinData?.results ?? []} />
    </>
  );
}

export default App;
