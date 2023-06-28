import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './error-page';
import './index.css';
import { Home } from './routes/Home';
import { Player } from './routes/Player';

const router = createBrowserRouter([
  {
    path: '/mwi-item-leaderboard',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/mwi-item-leaderboard/player/:playerId',
    element: <Player />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
