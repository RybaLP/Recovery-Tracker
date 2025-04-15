import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";


const router = createBrowserRouter([
    {
        path : '/',
        element : <LandingPage/>
    },

    {
        path : '/login',
        element : <LoginPage/>
    }
    
]);

function AppRouter(){
    return <RouterProvider router={router}/>;
}

export default AppRouter;