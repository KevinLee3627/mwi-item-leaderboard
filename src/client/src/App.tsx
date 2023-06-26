import './App.css';
import { Home } from './components/Home';

export interface Option<T> {
  label: string;
  value: T;
}

export interface ItemMetadata {
  hrid: string;
  displayName: string;
  enhancementLevel: number;
}

function App() {
  return <Home />;
}

export default App;
