import { Changelog } from './Changelog';
import { IssueModal } from './IssueModal';

export function Header() {
  return (
    <div className='w-full h-12 p-4 bg-slate-700 flex items-center justify-between'>
      <span className='font-bold'>MWI Item Leaderboards</span>
      <div className='flex gap-4'>
        <Changelog />
        <IssueModal />
      </div>
    </div>
  );
}
