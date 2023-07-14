import { useEffect, useState } from 'react';
import { Outlet, useLoaderData, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Header } from 'components/Header';

interface Tab<T> {
  value: T;
  label: string;
}

export function Player() {
  const location = useLocation();
  // TODO: Make actual type
  const data = useLoaderData() as { displayName: string; id: number };
  const defaultTab = location.pathname.split('/').at(-1) ?? 'items';
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  // Set correct highlighted tab
  useEffect(() => {
    setActiveTab(location.pathname.split('/').at(-1) ?? 'items');
  }, [location.pathname]);

  const tabs: Tab<string>[] = [
    { label: 'Items', value: 'items' },
    { label: 'Abilities', value: 'abilities' },
    { label: 'Stats', value: 'stats' },
    { label: 'Collection', value: 'collection' },
  ];

  const tabElems = tabs.map((tab, i) => {
    return (
      <Link to={`/player/${data.id}/${tab.value}`} key={i}>
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
      <div className='h-full mx-auto flex flex-col'>
        <h1 className='font-bold text-5xl text-center'>{data.displayName}</h1>
        <div className='tabs tabs-boxed mx-auto mt-4 inline-flex'>
          {tabElems}
        </div>
        <Outlet />
      </div>
    </>
  );
}
