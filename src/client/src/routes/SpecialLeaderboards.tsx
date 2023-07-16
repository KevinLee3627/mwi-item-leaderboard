import { Header } from 'components/Header';
import { Link } from 'react-router-dom';

export function SpecialLeaderboards() {
  return (
    <div className='w-full'>
      <Header />
      <h1 className='font-bold text-5xl text-center mt-4'>
        Special Leaderboards
      </h1>
      <div className='flex flex-col w-8/12 md:flex-row md:w-6/12 mx-auto justify-center gap-2'>
        <div className='bg-neutral p-4 text rounded-box my-8 inline-flex flex-col'>
          <h2 className='font-bold text-4xl mb-4'>Abilities</h2>
          <ul>
            <li>
              <Link to='/leaderboard/special/1' className='underline'>
                Overall Ability Level
              </Link>
            </li>
            <li>
              <Link to='/leaderboard/special/2' className='underline'>
                Overall Ability XP
              </Link>
            </li>
          </ul>
        </div>
        <div className='bg-neutral p-4 text rounded-box my-8 inline-flex flex-col'>
          <h2 className='font-bold text-4xl mb-4'>Items</h2>
          <ul>
            <li>
              <Link to='/leaderboard/special/3' className='underline'>
                Total Items (excluding coins)
              </Link>
            </li>
            <li>
              <Link to='/leaderboard/special/4' className='underline'>
                Total Unique Items
              </Link>
            </li>
            <LeaderboardLink title='Total Gems' id={6} />
          </ul>
        </div>
        <div className='bg-neutral p-4 text rounded-box my-8 inline-flex flex-col'>
          <h2 className='font-bold text-4xl mb-4'>Meta</h2>
          <ul>
            <li>
              <Link to='/leaderboard/special/5' className='underline'>
                Total Top Ranks
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

interface LeaderboardLinkProps {
  title: string;
  id: number;
}
function LeaderboardLink({ title, id }: LeaderboardLinkProps) {
  return (
    <li>
      <Link to={`/leaderboard/special/${id}`} className='underline'>
        {title}
      </Link>
    </li>
  );
}
