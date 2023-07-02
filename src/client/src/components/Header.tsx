import { Link } from 'react-router-dom';
import { Changelog } from 'components/Changelog';
import { IssueModal } from 'components/IssueModal';

export function Header() {
  return (
    <div className='navbar w-full h-12 p-4 bg-primary flex items-center justify-between'>
      <Link to='/' className='flex-1 font-bold text-white'>
        MWI Display Case
      </Link>
      <div className='indicator px-4 mx-4'>
        <span className='indicator-item badge badge-info'>new</span>
        <Link to='/leaderboard/special' className='text-white font-bold'>
          Special Leaderboards
        </Link>
      </div>
      <div className='px-4 mx-4'>
        <Link to='/search/player' className='text-white font-bold'>
          Player Search
        </Link>
      </div>
      <div className='px-4 mx-4'>
        <Changelog />
      </div>
      <div className='px-4 mx-4'>
        <IssueModal />
      </div>
    </div>
  );
}
