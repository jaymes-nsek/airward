import {Navigate, type RouteObject} from 'react-router-dom';
import App from "../../App.tsx";
import {Test} from "../../components/listen/ListenPage.tsx";
import {VowelLibraryPage} from "../../components/vowel-library-page/VowelLibraryPage.tsx";

export const appRoutes: RouteObject[] = [
    {
        element: <App/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/library" replace/>
            },
            {
                path: '/library',
                element: <VowelLibraryPage/>,
                loader: () => ({
                    title: 'Vowel Library',
                })
            },
            {
                path: '/listen',
                element: <Test name={'listen'}/>,
                loader: () => ({
                    title: 'Listen',
                })
            },
            {
                path: '/speak',
                element: <Test name={'speak'}/>,
                loader: () => ({
                    title: 'Speak',
                })
            },
            {
                path: '/stats',
                element: <Test name={'stats'}/>,
                loader: () => ({
                    title: 'Stats',
                })
            },
            {path: '*', element: <Navigate to="/library" replace/>},
        ],
    },
];