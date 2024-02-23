import { Bot, LogOut, LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";

import { ApplicationLogo } from "./application-logo";
import { Button } from "./ui/button";

const links = [{ title: "Chatbot", to: "/chatbot", Icon: Bot }] satisfies {
	title: string;
	to: string;
	Icon: LucideIcon;
}[];

export default function SideBar({ className }: { className?: string }) {
	const { pathname } = useLocation();
	const { logout } = useUser();

	return (
		<div
			className={cn(
				"flex min-h-screen w-full flex-col justify-between border-r p-6",
				className,
			)}
		>
			<div className="space-y-4">
				<div className="flex gap-4">
					<ApplicationLogo className="h-6 w-6" />

					<p className="font-heading font-semibold text-xl">
						LuxeGPT
					</p>
				</div>

				<nav>
					<ul className="space-y-1">
						{links.map(({ title, to, Icon }) => {
							return (
								<li key={to}>
									<Button
										variant={
											pathname === to
												? "secondary"
												: "ghost"
										}
										className="w-full justify-start"
										asChild
									>
										<Link to={to}>
											<Icon className="mr-2 h-4 w-4" />

											<span>{title}</span>
										</Link>
									</Button>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>

			<Button
				variant="ghost"
				className="flex justify-between"
				onClick={() => logout()}
			>
				<span>Cerrar Sesión</span>

				<LogOut className="h-4 w-4" />
			</Button>
		</div>
	);
}
