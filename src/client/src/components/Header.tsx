import { Bars3Icon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { Changelog } from 'routes/home/Changelog';
import { IssueModal } from 'routes/home/IssueModal';

export function Header() {
  return (
    <div className='navbar w-full h-12 p-4 bg-primary flex items-center justify-between'>
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
        <Link to='/' className='flex-1 font-bold text-white whitespace-nowrap'>
          MWI Display Case
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul tabIndex={0} className='menu menu-horizontal bg-blue-500'>
          <li className='text-left'>
            <span className='indicator-item badge badge-warning'>new</span>
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
