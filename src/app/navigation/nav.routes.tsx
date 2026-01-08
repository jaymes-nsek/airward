import {Navigate, type RouteObject} from 'react-router-dom';
import App from "../../App.tsx";
import {Test} from "../../components/listen/ListenPage.tsx";
import {VowelLibraryPage} from "../../components/vowel-library/VowelLibraryPage.tsx";

export const appRoutes: RouteObject[] = [
    {
        element: <App/>,
        children: [
            {path: '/', element: <Navigate to="/library" replace/>},
            {path: '/library', element: <VowelLibraryPage/>},
            {path: '/listen', element: <Test name={'listen'}/>},
            {path: '/speak', element: <Test name={'speak'}/>},
            {path: '/stats', element: <Test name={'stats'}/>},
            {path: '*', element: <Navigate to="/library" replace/>},
        ],
    },
];