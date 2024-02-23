import { Navigate, useLocation } from "react-router-dom";

import { useUser } from "@/hooks/use-user";

import { LoadingPage } from "./loading-page";

export function RequireAuth({
	children,
}: {
	children: React.ReactNode | React.ReactNode[];
}) {
	const { isLoading, user } = useUser();
	const location = useLocation();

	if (isLoading) return <LoadingPage />;

	if (user === null || user === undefined) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
}
