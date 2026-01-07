import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { appRoutes } from '../navigation/nav.routes';

export function AppRouter() {
    const router = useMemo(() => createBrowserRouter(appRoutes), []);
    return <RouterProvider router={router} />;
}
