import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

import { ApplicationLogo } from "./application-logo";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";

export default function GuestLayout({
	children,
	title,
	subtitle,
	description,
}: PropsWithChildren<{
	title?: string;
	subtitle?: string;
	description?: string;
}>) {
	return (
		<div className="relative flex min-h-screen flex-col items-center justify-center space-y-6 px-4 sm:container">
			<div className="space-y-4">
				<div className="flex justify-center">
					<Link to="/">
						<ApplicationLogo />
					</Link>
				</div>

				<div className="w-full max-w-lg space-y-2 text-center">
					<h1 className="text-3xl font-bold">{title}</h1>

					{subtitle ? (
						<p className="text-muted-foreground">{subtitle}</p>
					) : null}
				</div>
			</div>

			<Card className="w-full max-w-lg">
				{description ? (
					<CardHeader>
						<CardDescription>{description}</CardDescription>
					</CardHeader>
				) : null}

				<CardContent className={cn(description || "p-6")}>
					{children}
				</CardContent>
			</Card>
		</div>
	);
}
