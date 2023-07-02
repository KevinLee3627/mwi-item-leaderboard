import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  GetAbilityLeaderboardRes,
  GetAllAbilityMetadataRes,
  GetAllItemMetadataRes,
  GetItemLeaderboardRes,
  GetItemMetadataRes,
  GetOverallAbilityLevelLeaderboardRes,
  GetOverallAbilityXpLeaderboardRes,
} from 'server';
import {
  AbilityLeaderboard,
  AbilityLeaderboardLoaderData,
} from 'components/AbilityLeaderboard';
import { ItemLeaderboard } from 'components/ItemLeaderboard';
import { PlayerAbilities } from 'components/PlayerAbilities';
import { PlayerItems } from 'components/PlayerItems';
import { ErrorPage } from './error-page';
import './index.css';
import { Home } from 'routes/Home';
import { Player } from 'routes/Player';
import { SearchPlayer } from 'routes/SearchPlayer';
import { OverallAbilityLevelLeaderboard } from 'components/OverallAbilityLevelLeaderboard';
import { OverallAbilityXpLeaderboard } from 'components/OverallAbilityXpLeaderboard';
import { SpecialLeaderboards } from 'routes/SpecialLeaderboards';

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

          const { data: itemMetadata } = await axios.get<GetAllItemMetadataRes>(
            `${apiBase}/api/v1/item`
          );

          if (itemHrid == null)
            return {
              itemMetadata,
              leaderboard: [],
              enhancementLevelData: [],
            };

          const { data: leaderboard } = await axios.get<GetItemLeaderboardRes>(
            `${apiBase}/api/v1/leaderboard/item?itemHrid=${itemHrid}&enhancementLevel=${enhancementLevel}&limit=100`
          );

          const { data: enhancementLevelData } =
            await axios.get<GetItemMetadataRes>(
              `${apiBase}/api/v1/item?itemHrid=${itemHrid}`
            );
          return { itemMetadata, leaderboard, enhancementLevelData };
        },
      },
      {
        path: 'leaderboard/ability',
        element: <AbilityLeaderboard />,
        loader: async ({ request }) => {
          // TODO: for the love of god clean this up
          const params = new URL(request.url).searchParams;

          const { data: allAbilityMetadata } =
            await axios.get<GetAllAbilityMetadataRes>(
              `${apiBase}/api/v1/ability`
            );

          const abilityHrid = params.get('abilityHrid');
          const { data: leaderboard } =
            await axios.get<GetAbilityLeaderboardRes>(
              `${apiBase}/api/v1/leaderboard/ability?abilityHrid=${abilityHrid}&limit=100`
            );

          return {
            abilities: allAbilityMetadata.sort((a, b) =>
              a.displayName.localeCompare(b.displayName)
            ),
            leaderboard,
          } satisfies AbilityLeaderboardLoaderData;
        },
      },

      {
        index: true,
        element: <ItemLeaderboard />,
        loader: async () => {
          const { data: itemMetadata } = await axios.get<GetAllItemMetadataRes>(
            `${import.meta.env.VITE_API_BASE}/api/v1/item`
          );
          return { leaderboard: [], itemMetadata, enhancementLevelData: [] };
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
      return res.data;
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
          return res.data;
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
          return res.data;
        },
      },
      {
        path: '',
        element: <PlayerItems />,
        errorElement: <ErrorPage />,
        loader: async ({ params }) => {
          const res = await axios.get(
            `${apiBase}/api/v1/player/${params.playerId}/items`
          );
          return res.data;
        },
      },
    ],
  },
  {
    path: '/search/player',
    element: <SearchPlayer />,
    errorElement: <ErrorPage />,
  },

  // TODO: All the special leaderboards are hard-coded :( can we not do that
  {
    path: '/leaderboard/special/1',
    element: <OverallAbilityLevelLeaderboard />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const { data } = await axios.get<GetOverallAbilityLevelLeaderboardRes>(
        `${import.meta.env.VITE_API_BASE}/api/v1/leaderboard/special/1`
      );
      return { leaderboard: data.leaderboard, title: data.title };
    },
  },
  // TODO: All the special leaderboards are hard-coded :( can we not do that
  {
    path: '/leaderboard/special/2',
    element: <OverallAbilityXpLeaderboard />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const { data } = await axios.get<GetOverallAbilityXpLeaderboardRes>(
        `${import.meta.env.VITE_API_BASE}/api/v1/leaderboard/special/2`
      );
      return { leaderboard: data.leaderboard, title: data.title };
    },
  },
  {
    path: '/leaderboard/special',
    element: <SpecialLeaderboards />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
