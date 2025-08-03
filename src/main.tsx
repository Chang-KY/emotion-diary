import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {router} from "@/router/Router.tsx";
import {RouterProvider} from "react-router-dom";
import TanstackProvider from "@/router/TanstackProvider.tsx";
// import {createStore} from 'jotai';
// import {DevTools} from 'jotai-devtools';

// const customStore = createStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanstackProvider>
      <RouterProvider router={router}/>
      {/*<DevTools store={customStore}/>*/}
    </TanstackProvider>
  </StrictMode>,
)
