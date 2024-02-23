function Header({
	title,
	description,
	actions,
}: {
	title: string;
	description?: string;
	actions?: React.ReactNode;
}) {
	return (
		<header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div className="space-y-2">
				<h1 className="text-3xl font-semibold tracking-tight leading-tight">
					{title}
				</h1>

				{description ? (
					<p className="text-muted-foreground">{description}</p>
				) : null}
			</div>

			{actions ? <div className="w-fit">{actions}</div> : null}
		</header>
	);
}

export function PageLayout({
	headerProps,
	children,
}: {
	headerProps?: React.ComponentProps<typeof Header>;
	children?: React.ReactNode | React.ReactNode[];
}) {
	return (
		<div className="flex flex-col gap-6 h-full w-full">
			<div className="space-y-2">
				{headerProps ? <Header {...headerProps} /> : null}
			</div>

			<main className="flex-1 flex">{children}</main>
		</div>
	);
}
