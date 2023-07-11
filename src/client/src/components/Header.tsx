import { Link } from 'react-router-dom';
import { Changelog } from 'routes/home/Changelog';
import { IssueModal } from 'routes/home/IssueModal';

export function Header() {
  return (
    <div className='navbar w-full h-12 p-4 bg-primary flex items-center justify-between'>
      <Link to='/' className='flex-1 font-bold text-white'>
        MWI Display Case
      </Link>
      <div className='indicator px-4 mx-4'>
        <span className='indicator-item badge badge-warning'>new</span>
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
