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
