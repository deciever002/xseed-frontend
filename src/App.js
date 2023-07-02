import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from './pages/Register';
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Loader from "./components/Loader";
import QuizComponent from "./components/QuizComponent";

function App() {

  const {user,loading} = useContext(AuthContext);
  console.log(loading);
  let isLoggedIn = false;
  if(user?.email){
    isLoggedIn = true;
  }

  const router = createHashRouter([
    {
      path: '/',
      element: <Navbar />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: '/',
          element: <LandingPage />
        },
        {
          path: '/login',
          element: isLoggedIn ? <Navigate to='/dashboard' /> :<Login />
        },
        {
          path: '/register',
          element: isLoggedIn ? <Navigate to='/dashboard' /> : <Register />
        },
        {
          path: '/dashboard',
          element: isLoggedIn ? <Dashboard /> : <Navigate to="/login" />,
          children: [
            {
              path: "unit/:id",
              element: isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
            },
          ],
        },
        {
          path: '/quiz',
          element: isLoggedIn ? <QuizComponent /> : <Navigate to="/login" />
        }
      ]
    }
  ])
  return (
    <>
      {loading ? <Loader /> : <RouterProvider router={router} />}
    </>
  );
}

export default App;
