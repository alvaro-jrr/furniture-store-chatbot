import { ClassValue } from "clsx";
import { Store } from "lucide-react";

import { cn } from "@/lib/utils";

export function ApplicationLogo({ className }: { className: ClassValue }) {
	return <Store className={cn("h-12 w-12", className)} />;
}
