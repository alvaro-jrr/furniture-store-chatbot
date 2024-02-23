import { Outlet } from "react-router-dom";

import NavBar from "./navbar";
import SideBar from "./sidebar";

export function AuthLayout() {
	return (
		<div className="relative mx-auto flex min-h-screen w-full max-w-screen-2xl">
			<div className="hidden lg:block lg:w-full lg:max-w-xs">
				<SideBar />
			</div>

			<div className="relative max-h-screen flex flex-col flex-1 overflow-auto">
				<NavBar className="lg:hidden" />

				<div className="flex-1 p-6">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
