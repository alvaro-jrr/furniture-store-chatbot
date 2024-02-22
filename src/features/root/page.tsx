import { Outlet } from "react-router-dom";

export function RootPage() {
	return (
		<div className="bg-background antialiased">
			<Outlet />
		</div>
	);
}
