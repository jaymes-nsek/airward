import {VowelDetailsCard} from "../../components/vowel-details/vowel-details-card/VowelDetailsCard.tsx";
import {Navigate, type RouteObject} from 'react-router-dom';
import App from "../../App.tsx";
import {Test} from "../../components/listen/ListenPage.tsx";

export const appRoutes: RouteObject[] = [
    {
        element: <App/>,
        children: [
            {path: '/', element: <Navigate to="/library" replace/>},
            {path: '/library', element: <VowelDetailsCard/>},
            {path: '/listen', element: <Test name={'listen'}/>},
            {path: '/speak', element: <Test name={'speak'}/>},
            {path: '/stats', element: <Test name={'stats'}/>},
            {path: '*', element: <Navigate to="/library" replace/>},
        ],
    },
];