import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Leaderboard } from './components/Leaderboard';
import { ErrorPage } from './error-page';
import './index.css';
import { Home } from './routes/Home';
import { Player } from './routes/Player';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'item',
        element: <Leaderboard />,
        loader: async ({ request }) => {
          const queryParams = new URL(request.url).searchParams;
          const itemHrid = queryParams.get('itemHrid');
          const enhancementLevel = queryParams.get('enhancementLevel');
          const res = await axios.get(
            `${
              import.meta.env.VITE_API_BASE as string
            }/api/v1/item?itemHrid=${itemHrid}&enhancementLevel=${enhancementLevel}&limit=10`
          );
          return res.data.results;
        },
      },
    ],
  },
  {
    path: '/player/:playerId',
    element: <Player />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
