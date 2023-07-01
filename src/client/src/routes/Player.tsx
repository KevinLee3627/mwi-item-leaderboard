import { useState } from 'react';
import { Outlet, useLoaderData, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';

interface Tab<T> {
  value: T;
  label: string;
}

export function Player() {
  const location = useLocation();
  // TODO: Make actual type
  const data = useLoaderData() as { displayName: string; id: number };

  const defaultTab = location.pathname.includes('abilities')
    ? 'abilities'
    : 'items';
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  const tabs: Tab<string>[] = [
    { label: 'Items', value: 'items' },
    { label: 'Abilities', value: 'abilities' },
  ];

  const tabElems = tabs.map((tab) => {
    return (
      <Link to={`/player/${data.id}/${tab.value}`}>
        <button
          className={`tab hover:tab-active ${
            activeTab === tab.value && 'tab-active'
          }`}
          onClick={() => setActiveTab(tab.value)}
        >
          {tab.label}
        </button>
      </Link>
    );
  });

  return (
    <>
      <Header />
      <div className='w-8/12 h-full mx-auto flex flex-col items-center'>
        <h1 className='font-bold text-5xl'>{data.displayName}</h1>
        <div className='tabs tabs-boxed mx-auto mt-4 inline-flex'>
          {tabElems}
        </div>
        <Outlet />
      </div>
    </>
  );
}
