import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import { Toaster } from "react-hot-toast";


const router = createBrowserRouter([
    {
        path : '/',
        element : <LandingPage/>
    },

    {
        path : '/login',
        element : <LoginPage/>
    },

    {
        path : '/register',
        element : <RegisterPage/>
    }
    
]);

function AppRouter(){
    return <>
          <RouterProvider router={router}/>
          <Toaster/>
    </>
  
}

export default AppRouter;