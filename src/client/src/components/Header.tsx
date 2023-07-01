import { Link } from 'react-router-dom';
import { Changelog } from 'components/Changelog';
import { IssueModal } from 'components/IssueModal';

export function Header() {
  return (
    <div className='navbar w-full h-12 p-4 bg-primary flex items-center justify-between'>
      <Link to='/' className='flex-1 font-bold text-white'>
        MWI Display Case
      </Link>
      <div className='px-4'>
        <Link to='/search/player' className='text-white font-bold'>
          Player Search
        </Link>
      </div>
      <Changelog />
      <IssueModal />
    </div>
  );
}
