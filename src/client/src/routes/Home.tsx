import { Header } from '../components/Header';
import { Outlet, useLocation } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Tab<T> {
  value: T;
  label: string;
}

export function Home() {
  const location = useLocation();

  const defaultTab = location.pathname.includes('item') ? 'item' : 'ability';
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  const tabs: Tab<string>[] = [
    { label: 'Items', value: 'item' },
    { label: 'Abilities', value: 'ability' },
  ];

  const tabElems = tabs.map((tab) => {
    return (
      <button
        className={`tab hover:tab-active ${
          activeTab === tab.value && 'tab-active'
        }`}
        onClick={() => setActiveTab(tab.value)}
      >
        <Link to={`/leaderboard/${tab.value}`}>{tab.label}</Link>
      </button>
    );
  });

  return (
    <div className='w-full h-full mx-auto'>
      <Header />
      <div className='mx-auto flex place-items-center my-4'>
        <div className='tabs tabs-boxed mx-auto inline-flex'>{tabElems}</div>
      </div>
      <Outlet />
    </div>
  );
}
