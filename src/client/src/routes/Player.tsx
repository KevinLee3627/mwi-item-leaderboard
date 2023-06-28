import { useParams } from 'react-router';
import { GetItemLeaderboardReturn } from 'server';
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
      <div className='w-8/12 h-full mx-auto'>
        <h1>Player: {playerData.results[0].player.displayName}</h1>
        <PlayerItemsTable
          data={playerData.results.sort((a, b) =>
            a.itemHrid.localeCompare(b.itemHrid)
          )}
        />
      </div>
    );
  }
}
