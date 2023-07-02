import { Header } from 'components/Header';
import { Link } from 'react-router-dom';

export function SpecialLeaderboards() {
  return (
    <>
      <Header />
      <h1 className='font-bold text-6xl text-center mt-4'>
        Special Leaderboards
      </h1>
      <div className='flex lg:w-6/12 mx-auto justify-center'>
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
      </div>
    </>
  );
}
