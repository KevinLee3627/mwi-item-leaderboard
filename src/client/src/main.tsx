import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AbilityLeaderboard } from './components/AbilityLeaderboard';
import { ItemLeaderboard } from './components/ItemLeaderboard';
import { ErrorPage } from './error-page';
import './index.css';
import { Home } from './routes/Home';
import { Player } from './routes/Player';
import { SearchPlayer } from './routes/SearchPlayer';

const apiBase = import.meta.env.VITE_API_BASE as string;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'leaderboard/item',
        element: <ItemLeaderboard />,
        loader: async ({ request }) => {
          const queryParams = new URL(request.url).searchParams;
          const itemHrid = queryParams.get('itemHrid');
          const enhancementLevel = queryParams.get('enhancementLevel');
          try {
            const res = await axios.get(
              `${apiBase}/api/v1/leaderboard/item?itemHrid=${itemHrid}&enhancementLevel=${enhancementLevel}&limit=100`
            );
            return res.data.results;
          } catch (err) {
            console.error(err);
            return [];
          }
        },
      },
      {
        path: 'leaderboard/ability',
        element: <AbilityLeaderboard />,
        loader: async ({ params }) => {
          try {
            const allAbilityData = await axios({
              url: `${import.meta.env.VITE_API_BASE}/api/v1/abilities`,
              method: 'GET',
            });
            const abilityHrid = params.abilityHrid;
            const leaderboard = await axios.get(
              `${apiBase}/api/v1/leaderboard/ability?ability?abilityHrid=${abilityHrid}&limit=100`
            );

            return {
              abilities: allAbilityData.data.results,
              leaderboard: leaderboard.data.results,
            };
          } catch (err) {
            console.error(err);
            return { abilities: [], leaderboard: [] };
          }
        },
      },
      {
        path: '/',
        element: <ItemLeaderboard />,
        loader: async () => {
          return [];
        },
      },
    ],
  },
  {
    path: 'player/:playerId',
    element: <Player />,
    errorElement: <ErrorPage />,
    loader: async ({ params }) => {
      const res = await axios.get(
        `${apiBase}/api/v1/player?playerId=${params.playerId}`
      );
      console.log(res.data);
      return res.data.results;
    },
  },
  {
    path: '/search/player',
    element: <SearchPlayer />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
