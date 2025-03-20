import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}>
    
  </RouterProvider>
)
