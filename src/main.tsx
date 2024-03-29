import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "./components/auth-layout.tsx";
import { RequireAuth } from "./components/require-auth.tsx";
import { LoginPage } from "./features/auth/pages/login-page.tsx";
import { RegisterPage } from "./features/auth/pages/register-page.tsx";
import { ChatbotPage } from "./features/chatbot/page.tsx";
import { RootPage } from "./features/root/page.tsx";
import { SplashPage } from "./features/splash/page.tsx";
import "./index.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootPage />,
		children: [
			{
				index: true,
				element: <SplashPage redirectPath="/chatbot" />,
			},
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "sign-up",
				element: <RegisterPage />,
			},
			{
				element: <AuthLayout />,
				children: [
					{
						path: "chatbot",
						element: (
							<RequireAuth>
								<ChatbotPage />
							</RequireAuth>
						),
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
