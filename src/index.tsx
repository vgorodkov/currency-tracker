import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { LazyTimeline } from './pages/timeline/Timeline.lazy';
import { LazyHome } from './pages/home/Home.lazy';
import { LazyBankCard } from './pages/bankcard/BankCard.lazy';
import { LazyContacts } from './pages/contacts/Contacts.lazy';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('rootElement not found');
}

const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home',
        element: (
          <Suspense fallback="Loading...">
            <LazyHome />
          </Suspense>
        ),
      },
      {
        path: 'timeline',
        element: (
          <Suspense fallback="Loading...">
            <LazyTimeline />
          </Suspense>
        ),
      },
      {
        path: 'bankcard',
        element: (
          <Suspense fallback="Loading...">
            <LazyBankCard />
          </Suspense>
        ),
      },
      {
        path: 'contacts',
        element: (
          <Suspense fallback="Loading...">
            <LazyContacts />
          </Suspense>
        ),
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
