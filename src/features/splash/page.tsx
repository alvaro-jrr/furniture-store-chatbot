import { Navigate } from "react-router-dom";

import { LoadingPage } from "@/components/loading-page";
import { useUser } from "@/hooks/use-user";

export function SplashPage({ redirectPath }: { redirectPath: string }) {
	const { isLoading, user } = useUser();

	if (isLoading) return <LoadingPage />;

	if (user === null || user === undefined) return <Navigate to="/login" />;

	return <Navigate to={redirectPath} />;
}
