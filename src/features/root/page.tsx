import { Outlet } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";

export function RootPage() {
	return (
		<div className="bg-background antialiased">
			<Outlet />

			<Toaster />
		</div>
	);
}
