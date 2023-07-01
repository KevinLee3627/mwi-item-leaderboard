import { Header } from 'components/Header';
import { debounce } from 'util/debounce';
import React, { useState } from 'react';
import axios from 'axios';
import { SearchPlayerRes } from 'server';
import { Link } from 'react-router-dom';

interface SearchResult<T> {
  label: string;
  value: T;
}

export function SearchPlayer() {
  const [results, setResults] = useState<SearchResult<number>[]>([]);

  const getResults = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = await axios.get<SearchPlayerRes>(
      `${import.meta.env.VITE_API_BASE}/api/v1/player?q=${e.target.value}`
    );
    const results = res.data;
    setResults(
      results.map((result) => ({ label: result.displayName, value: result.id }))
    );
  };

  const debouncedGetResults = debounce(getResults, 300);

  return (
    <div className='w-full h-full mx-auto'>
      <Header />
      <div className='w-6/12 mx-auto'>
        <input
          type='text'
          placeholder='Search for players...'
          className='input border-primary mt-4 w-full'
          onChange={debouncedGetResults}
        />
        {/* TODO: Make search results look good */}
        <div className='w-full mt-2'>
          {results.map((result, i) => {
            return (
              <div key={i} className='p-2 ml-0 pl-0'>
                <Link
                  to={`/player/${result.value}`}
                  className='text-lg p-2 font-bold border border-secondary'
                >
                  {result.label}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
