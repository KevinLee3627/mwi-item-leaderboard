import './App.css';
import { SearchBox } from './components/SearchBox';
import { useFetch } from './hooks/useFetch';

interface ItemMetadata {
  hrid: string;
  displayName: string;
  enhancementLevel: string;
}

interface Res {
  message: string;
  results: ItemMetadata[];
}

function App() {
  const { data, loading } = useFetch<Res>({
    url: 'http://localhost:8443/api/v1/items',
    method: 'GET',
  });

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
    </>
  );
}

export default App;
