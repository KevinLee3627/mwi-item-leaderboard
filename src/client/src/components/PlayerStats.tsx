import { useLoaderData } from 'react-router';
import { GetPlayerStatsRes } from 'server';

export function PlayerStats() {
  const data = useLoaderData() as GetPlayerStatsRes;

  return (
    <>
      <div className='flex'>
        <div className='stat'>
          <div className='stat-title'># Top Ranks</div>
          <div className='stat-value'>{data.topRanks.toLocaleString()}</div>
          <div className='stat-desc invisible'>lol centering</div>
        </div>
      </div>
    </>
  );
}
