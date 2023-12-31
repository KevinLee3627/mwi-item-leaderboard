import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  GetAbilityLeaderboardRes,
  GetAllAbilityMetadataRes,
  GetAllItemMetadataRes,
  GetGameItemDetailMapRes,
  GetItemLeaderboardRes,
  GetItemMetadataRes,
  GetOverallAbilityLevelLeaderboardRes,
  GetOverallAbilityXpLeaderboardRes,
  GetPlayerCollectionRes,
  GetSingleAbilityLevelLeaderboardRes,
  GetTotalGemsLeaderboardRes,
  GetTotalItemsLeaderboardRes,
  GetTotalTopRanksLeaderboardRes,
  GetTotalUniqueItemsLeaderboardRes,
} from 'server';
import {
  AbilityLeaderboard,
  AbilityLeaderboardLoaderData,
} from 'components/AbilityLeaderboard';
import { ItemLeaderboard } from 'components/ItemLeaderboard';
import { PlayerAbilities } from 'routes/player/PlayerAbilities';
import { PlayerItems } from 'routes/player/PlayerItems';
import { ErrorPage } from 'src/error-page';
import './index.css';
import { Home } from 'routes/home/Home';
import { Player } from 'routes/player/Player';
import { SearchPlayer } from 'routes/SearchPlayer';
import { OverallAbilityLevelLeaderboard } from 'components/special/OverallAbilityLevelLeaderboard';
import { OverallAbilityXpLeaderboard } from 'components/special/OverallAbilityXpLeaderboard';
import { SpecialLeaderboards } from 'routes/SpecialLeaderboards';
import { TotalItemsLeaderboard } from 'components/special/TotalItemsLeaderboard';
import { TotalUniqueItemsLeaderboard } from 'components/special/TotalUniqueItemsLeaderboard';
import { TotalTopSpotsLeaderboard } from 'components/special/TotalTopRanksLeaderboard';
import { PlayerStats } from 'routes/player/PlayerStats';
import { PlayerCollection } from 'routes/player/PlayerCollection';
import { TotalGemsLeaderboard } from 'components/special/TotalGemsLeaderboard';
import { SingleAbilityLevelLeaderboard } from 'components/special/SingleAbilityLevelLeaderboard';

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

          const { data: allItemMetadata } =
            await axios.get<GetAllItemMetadataRes>(`${apiBase}/api/v1/item`);
          console.log(allItemMetadata);
          if (itemHrid == null)
            return {
              allItemMetadata,
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
          return {
            allItemMetadata,
            leaderboard,
            enhancementLevelData,
          };
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
          const { data: allItemMetadata } =
            await axios.get<GetAllItemMetadataRes>(
              `${import.meta.env.VITE_API_BASE}/api/v1/item`
            );
          return { leaderboard: [], allItemMetadata, enhancementLevelData: [] };
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
        path: 'stats',
        element: <PlayerStats />,
        errorElement: <ErrorPage />,
        loader: async ({ params }) => {
          const res = await axios.get(
            `${apiBase}/api/v1/player/${params.playerId}/stats`
          );
          return res.data;
        },
      },
      {
        path: 'collection',
        element: <PlayerCollection />,
        errorElement: <ErrorPage />,
        loader: async ({ params }) => {
          const collectionRes = await axios.get<GetPlayerCollectionRes>(
            `${apiBase}/api/v1/player/${params.playerId}/collection`
          );
          const itemDetailMapRes = await axios.get<GetGameItemDetailMapRes>(
            `${apiBase}/api/v1/game/items`
          );
          return {
            ...collectionRes.data,
            itemDetailMap: itemDetailMapRes.data,
          };
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
    path: '/leaderboard/special/3',
    element: <TotalItemsLeaderboard />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const { data } = await axios.get<GetTotalItemsLeaderboardRes>(
        `${import.meta.env.VITE_API_BASE}/api/v1/leaderboard/special/3`
      );
      return { leaderboard: data.leaderboard, title: data.title };
    },
  },
  {
    path: '/leaderboard/special/4',
    element: <TotalUniqueItemsLeaderboard />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const { data } = await axios.get<GetTotalUniqueItemsLeaderboardRes>(
        `${import.meta.env.VITE_API_BASE}/api/v1/leaderboard/special/4`
      );
      return { leaderboard: data.leaderboard, title: data.title };
    },
  },
  {
    path: '/leaderboard/special/5',
    element: <TotalTopSpotsLeaderboard />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const { data } = await axios.get<GetTotalTopRanksLeaderboardRes>(
        `${import.meta.env.VITE_API_BASE}/api/v1/leaderboard/special/5`
      );
      return { leaderboard: data.leaderboard, title: data.title };
    },
  },
  {
    path: '/leaderboard/special/6',
    element: <TotalGemsLeaderboard />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const { data } = await axios.get<GetTotalGemsLeaderboardRes>(
        `${import.meta.env.VITE_API_BASE}/api/v1/leaderboard/special/6`
      );
      return { leaderboard: data.leaderboard, title: data.title };
    },
  },
  {
    path: '/leaderboard/special/7',
    element: <SingleAbilityLevelLeaderboard />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const { data } = await axios.get<GetSingleAbilityLevelLeaderboardRes>(
        `${import.meta.env.VITE_API_BASE}/api/v1/leaderboard/special/7`
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
