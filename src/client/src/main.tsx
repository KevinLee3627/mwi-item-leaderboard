import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Leaderboard } from './components/Leaderboard';
import { ErrorPage } from './error-page';
import './index.css';
import { Home } from './routes/Home';
import { Player } from './routes/Player';

const apiBase = import.meta.env.VITE_API_BASE as string;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'leaderboard',
        element: <Leaderboard />,
        loader: async ({ request }) => {
          const queryParams = new URL(request.url).searchParams;
          const itemHrid = queryParams.get('itemHrid');
          const enhancementLevel = queryParams.get('enhancementLevel');
          const res = await axios.get(
            `${apiBase}/api/v1/leaderboard?itemHrid=${itemHrid}&enhancementLevel=${enhancementLevel}&limit=100`
          );
          return res.data.results;
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
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
