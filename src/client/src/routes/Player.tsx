import { useParams } from 'react-router';
import { GetItemLeaderboardReturn } from 'server';
import { Header } from '../components/Header';
import { PlayerItemsTable } from '../components/PlayerItemsTable';
import { useFetch } from '../hooks/useFetch';
import { ApiRes } from '../types/ApiRes';

export function Player() {
  const { playerId } = useParams();

  const { data: playerData, loading } = useFetch<
    ApiRes<GetItemLeaderboardReturn>
  >({
    url: `${import.meta.env.VITE_API_BASE}/api/v1/player?playerId=${playerId}`,
    method: 'GET',
  });

  if (loading || playerData == null) {
    return <p>todo loading thing</p>;
  } else {
    return (
      <>
        <Header />
        <div className='w-8/12 h-full mx-auto flex flex-col items-center'>
          <h1 className='font-bold text-5xl'>
            {playerData.results[0].player.displayName}
          </h1>
          <div className='flex'>
            <div className='stat'>
              <div className='stat-title'># Unique Items</div>
              <div className='stat-value'>5</div>
            </div>
            <div className='stat'>
              <div className='stat-title'>Total # of Items</div>
              <div className='stat-value'>100</div>
            </div>
          </div>
          <PlayerItemsTable
            data={playerData.results.sort((a, b) =>
              a.itemHrid.localeCompare(b.itemHrid)
            )}
          />
        </div>
      </>
    );
  }
}
