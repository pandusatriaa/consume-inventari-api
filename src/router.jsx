import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Stuff from "./pages/Stuff"
import StuffTrash from "./pages/stuffTrash";

 export const router = createBrowserRouter([
    {path: '/', element: <App />},
    {path: '/Login', element: <Login />},
    {path: '/profile', element: <Profile />},
    {path: '/stuffs', element: <Stuff />},
    {path: '/stuffs/trash', element: <StuffTrash />}
])