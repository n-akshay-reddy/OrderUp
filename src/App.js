import React, { lazy, Suspense } from "react"
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter,RouterProvider, Outlet } from "react-router-dom";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import appStore from "./utils/appStore";
import { Provider } from  "react-redux"
import Cart from "./components/Cart";
import About from "./components/About/About";
import Search from "./components/Search";

// import About from "./components/About/About";


const About = lazy(() => import("./components/About/About"));

const AppLayout = () => {
    return (
        <Provider store={appStore}>
        <div className="app">
            <Header />
            <Outlet />
        </div>
        </Provider>
    )
}

const appRoute = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body/>
            },
            {
                path: "/about",
                element: <Suspense fallback={<div class="loader-wrapper">
                    <div class="loader"></div>
                    </div>
                  }><About/></Suspense>
                // element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu />
            },
            {
                path: "/cart",
                element: <Cart/>
            },
            {
                path: "/search",
                element: <Search />
            }
            
        ],
        errorElement: <Error />
    },
    
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<RouterProvider router={appRoute}/>)