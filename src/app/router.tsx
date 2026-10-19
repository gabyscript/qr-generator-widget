import { createBrowserRouter, Navigate } from 'react-router-dom'
import { PageLoading } from './PageLoading'

// Each page is lazy-loaded so the widget bundle loaded by OBS doesn't include the configurator.
export const router = createBrowserRouter([
  {
    path: '/',
    HydrateFallback: PageLoading,
    lazy: async () => ({ Component: (await import('@/features/configurator')).ConfiguratorPage }),
  },
  {
    path: '/widget',
    HydrateFallback: PageLoading,
    lazy: async () => ({ Component: (await import('@/features/widget')).WidgetPage }),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
