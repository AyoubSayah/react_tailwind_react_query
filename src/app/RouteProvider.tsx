import { createBrowserRouter, RouterProvider, type RouteObject, Navigate } from "react-router"
import { Suspense } from 'react'
import LoginPage from "../modules/auth/LoginPage"
import PrivateLayout from "../layouts/PrivateLayout"
import CLIENTS_ROUTE from "../modules/clients/route"
import DASHBOARD_ROUTE from "../modules/dashboard/route"
import { Loader } from "../components/loader"
import AuthProtected from "./AuthProtected"
const routesTable = [
    ...CLIENTS_ROUTE,
    ...DASHBOARD_ROUTE,
]
const AppRouterProvider = () => {
    const mainRoutes: RouteObject[] = [
        {
            path: '/',
            element: <Navigate to="/login" replace />
        },
        {
            path: 'login',
            element: (
                <Suspense fallback={<Loader label="Loading" />}>
                    <LoginPage />
                </Suspense>
            ),
        },

        {
            path: 'private',
            errorElement: (
                <div className="flex items-center justify-center h-screen">
                    <h1 className="text-3xl font-bold text-red-600">404 - Not Found</h1>
                </div>
            ),
            element: (
                <AuthProtected>
                    <PrivateLayout />
                </AuthProtected>
            ),
            children: routesTable as RouteObject[],
        },
        {
            path: '*',
            element: <Navigate to="/login" replace />
        }
    ]

    const router = createBrowserRouter(mainRoutes)

    return <RouterProvider router={router} />
}

export default AppRouterProvider
