import './App.css';
import { Leaderboard, LeaderboardDatum } from './components/Leaderboard';
import { SearchBox } from './components/SearchBox';
import { useFetch } from './hooks/useFetch';

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
  const { data, loading } = useFetch<Res<ItemMetadata>>({
    url: 'http://localhost:8443/api/v1/items',
    method: 'GET',
  });

  const { data: coinData } = useFetch<Res<LeaderboardDatum>>({
    url: 'https://1c9d-24-14-32-183.ngrok-free.app/api/v1/item?itemHrid=/items/coin&limit=5',
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
        options={data?.results.map((itemMetadata) => ({
          value: itemMetadata.hrid,
          label: itemMetadata.displayName,
        }))}
        loading={loading}
      />
      <Leaderboard data={coinData?.results ?? []} />
    </>
  );
}

export default App;
