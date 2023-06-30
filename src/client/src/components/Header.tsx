import { Link } from 'react-router-dom';
import { Changelog } from './Changelog';
import { IssueModal } from './IssueModal';

export function Header() {
  return (
    <div className='w-full h-12 p-4 bg-primary flex items-center justify-between'>
      <Link to='/' className='font-bold text-white'>
        MWI Item Leaderboards
      </Link>
      <div className='flex gap-4'>
        <Changelog />
        <IssueModal />
      </div>
    </div>
  );
}
