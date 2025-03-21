import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from './pages/Home.tsx'
import Join from './pages/Join.tsx'
import Room from './pages/Room.tsx'
import { store } from './app/store.ts'

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
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>

)
