import { Bars3Icon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Changelog } from 'routes/home/Changelog';
import { IssueModal } from 'routes/home/IssueModal';

import { ScraperStatus } from 'server/src/status/services/getScraperStatus';

const apiBase = import.meta.env.VITE_API_BASE as string;

async function getStatus(): Promise<ScraperStatus> {
  const res = await axios.get(`${apiBase}/api/v1/status/scraper`);
  // return res.data.status;
  return res.data.status;
}

function StatusBadge({
  status,
  className,
}: {
  status: ScraperStatus;
  className?: string;
}) {
  const badgeClass = status === 'down' ? 'badge-error' : 'badge-success';
  return (
    <div className={`badge ${badgeClass} ${className ?? ''}`}>
      status: {status}
    </div>
  );
}

export function Header() {
  const [status, setStatus] = useState<ScraperStatus>('running');

  const updateState = useCallback(async () => {
    const newStatus = await getStatus();
    setStatus(newStatus);
  }, []);

  useEffect(() => {
    setInterval(updateState, 30000);
  }, [updateState]);

  return (
    // Mobile
    <div className='navbar w-full h-12 bg-primary flex items-center justify-between'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden'>
            <Bars3Icon className='h-5' />
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content rounded p-4 flex flex-col gap-2 z-10 bg-base-200 whitespace-nowrap'
          >
            <li className='text-left'>
              <Link to='/leaderboard/special' className='text-white'>
                Special Leaderboards
              </Link>
            </li>
            <li className='text-left'>
              <Link to='/search/player' className='text-white'>
                Player Search
              </Link>
            </li>
            <li>
              <Changelog dialogId='sm-changelogModal' buttonTextAlign='left' />
            </li>
            <li>
              <IssueModal dialogId='sm-issueModal' buttonTextAlign='left' />
            </li>
          </ul>
        </div>
        <div>
          <Link
            to='/'
            className='flex-1 font-bold text-white whitespace-nowrap'
          >
            MWI Display Case
          </Link>
          <StatusBadge status={status} className='ml-4' />
        </div>
      </div>
      <StatusBadge status={status} className='md:hidden' />
      {/* Desktop */}
      <div className='navbar-center hidden md:flex'>
        <ul
          tabIndex={0}
          className='rounded p-4 flex gap-4 z-10 whitespace-nowrap'
        >
          <li className='text-left'>
            <Link to='/leaderboard/special' className='text-white font-bold'>
              Special Leaderboards
            </Link>
          </li>
          <li className='text-left'>
            <Link to='/search/player' className='text-white font-bold'>
              Player Search
            </Link>
          </li>
          <li>
            <Changelog dialogId='lg-changelogModal' />
          </li>
          <li>
            <IssueModal />
          </li>
        </ul>
      </div>
    </div>
  );
}
