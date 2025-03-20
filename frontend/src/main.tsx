import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Join from './pages/Join.tsx'
import Room from './pages/Room.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/join",
        element: <Join />
      },
      {
        path: "/room/:roomId",
        element: <Room />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}>
    
  </RouterProvider>
)
