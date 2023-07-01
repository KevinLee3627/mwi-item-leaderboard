import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GetAllAbilitiesReturn } from 'server';
import {
  AbilityLeaderboard,
  AbilityLeaderboardLoaderData,
} from './components/AbilityLeaderboard';
import { ItemLeaderboard } from './components/ItemLeaderboard';
import { PlayerAbilities } from './components/PlayerAbilities';
import { PlayerItems } from './components/PlayerItems';
import { ErrorPage } from './error-page';
import './index.css';
import { Home } from './routes/Home';
import { Player } from './routes/Player';
import { SearchPlayer } from './routes/SearchPlayer';
import { ApiRes } from './types/ApiRes';

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
        loader: async ({ request }) => {
          // TODO: for the love of god clean this up
          const params = new URL(request.url).searchParams;
          const data: AbilityLeaderboardLoaderData = {
            abilities: [],
            leaderboard: [],
          };
          try {
            const allAbilityData = await axios.get<
              ApiRes<GetAllAbilitiesReturn>
            >(`${apiBase}/api/v1/abilities`);
            data.abilities = allAbilityData.data.results.sort((a, b) =>
              a.displayName.localeCompare(b.displayName)
            );
          } catch (err) {
            console.error(err);
          }
          try {
            const abilityHrid = params.get('abilityHrid');
            const leaderboard = await axios.get(
              `${apiBase}/api/v1/leaderboard/ability?abilityHrid=${abilityHrid}&limit=100`
            );
            data.leaderboard = leaderboard.data.results;
          } catch (err) {
            console.error(err);
          }
          return data;
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
        `${apiBase}/api/v1/player/${params.playerId}`
      );
      return res.data.result;
    },
    children: [
      {
        path: 'items',
        element: <PlayerItems />,
        errorElement: <ErrorPage />,
        loader: async ({ params }) => {
          const res = await axios.get(
            `${apiBase}/api/v1/player/${params.playerId}/items`
          );
          return res.data.results;
        },
      },
      {
        path: 'abilities',
        element: <PlayerAbilities />,
        errorElement: <ErrorPage />,
        loader: async ({ params }) => {
          const res = await axios.get(
            `${apiBase}/api/v1/player/${params.playerId}/abilities`
          );
          return res.data.results;
        },
      },
    ],
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
