import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const variantsLookup = {
	field: "text-sm text-destructive",
	general:
		"text-sm text-destructive border-l-2 border-red-500 px-2 min-h-[40px] flex items-center bg-destructive/5",
};

export function InputError({
	message,
	className = "",
	variant = "field",
	...props
}: HTMLAttributes<HTMLParagraphElement> & {
	message?: string;
	variant?: keyof typeof variantsLookup;
}) {
	return message ? (
		<p {...props} className={cn(variantsLookup[variant], className)}>
			{message}
		</p>
	) : null;
}
