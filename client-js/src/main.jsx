import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import "./index.css";

import FormPage from "./pages/FormPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AdminConsolePage from "./pages/AdminConsolePage.jsx";
import SpecialRegisterPage from "./pages/SpecialRegisterPage.jsx";
import SpecialFormPage from "./pages/SpecialFormPage.jsx";

import { getUser, getSpecialUser } from "./api/user.js";
import { getConsole } from "./api/console.js";

import config from "./services/config.js";
import RegisterHomePage from "./pages/RegisterHomePage.jsx";

const IS_REGISTRATION_OPEN = false; // TODO: Change to true when registration opens

const registrationGuard = async (loaderFn) => {
    if (!IS_REGISTRATION_OPEN) {
        return (window.location.href = "/");
    }
    return loaderFn();
};

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
        },
        {
            path: "/register",
            element: <RegisterHomePage />,
            loader: () => registrationGuard(async () => {
                let user = await getUser();
                let Console = await getConsole();
                return { user, Console };
            }),
        },
        {
            path: "/register/form",
            element: <FormPage />,
            loader: () => registrationGuard(async () => {
                let user = await getUser();
                let Console = await getConsole();

                if (user.message === "No session.") {
                    return (window.location.href = "/register");
                }

                return { user, Console };
            }),
        },
        {
            path: "/profile",
            element: <ProfilePage />,
            loader: () => registrationGuard(async () => {
                let user = await getUser();
                let Console = await getConsole();

                if (user.message === "No session.") {
                    return (window.location.href = "/register");
                }

                return { user, Console };
            }),
        },
        {
            path: "/admin",
            element: <AdminPage />,
        },
        {
            path: "/admin/control-panel",
            element: <AdminConsolePage />,
            loader: async () => {
                let Console = await getConsole();
                return { Console };
            },
        },
        {
            path: `/special-register/${config.SPECIAL_SECRET_URL}`,
            element: <SpecialRegisterPage />,
            loader: () => registrationGuard(async () => {
                return null;
            }),
        },

        {
            path: `/special-register/${config.SPECIAL_SECRET_URL}/${config.SPECIAL_SECRET_FORM_URL}`,
            element: <SpecialFormPage />,
            loader: () => registrationGuard(async () => {
                let user = await getSpecialUser();
                return { user };
            }),
        },
    ],
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <div className="w-full h-screen bg-secondary-500 fixed left-0 top-0 -z-10" />
    </React.StrictMode>
);
