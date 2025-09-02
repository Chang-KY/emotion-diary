import {createBrowserRouter, Navigate, type RouteObject} from "react-router-dom";
import App from "@/App.tsx";
import NotFound from "@/pages/error/NotFound.tsx";
import Error from "@/pages/error/Error.tsx";
import Start from "@/pages/Start.tsx";
import AuthCallback from "@/router/AuthCallback.tsx";
import ProtectedRouter from "@/router/ProtectedRouter.tsx";
import NotAuthError from "@/pages/error/NotAuthError.tsx";
import {appTabs} from "@/constants/appTabs.tsx";
import DetailDiary from "@/pages/DetailDiary.tsx";
import UserPage from "@/pages/UserPage.tsx";
import SearchUser from "@/pages/SearchUser.tsx";

const routes: RouteObject[] = [
  {
    path: 'emotion-diary',
    children: [
      {
        path: '',
        element: <ProtectedRouter><App/></ProtectedRouter>,
        errorElement: <NotAuthError/>, // 인증 없이 들어가도록 할 시 에러 발생
        children: [
          {
            index: true,
            element: <Navigate to="my-list" replace/>,
          },
          ...appTabs.map(tab => ({
            path: tab.path,
            element: tab.element,
          })),
          {
            path: "diary/:id",
            element: <DetailDiary/>
          },
          {
            path: "user-page/:id",
            element: <UserPage/>
          },
          {
            path: "search-user",
            element: <SearchUser/>,
          }
        ],
      },
      {
        path: 'error',
        element: <Error/>,
      },
      {
        path: 'start',
        element: <Start/>
      },
      {
        path: 'auth/callback',
        element: <AuthCallback/>
      },
      {
        path: '*',
        element: <NotFound/>,
      },
    ]
  },
];

export const router = createBrowserRouter(routes);
