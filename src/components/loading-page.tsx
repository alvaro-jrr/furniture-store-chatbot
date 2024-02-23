import { Loader2 } from "lucide-react";

export function LoadingPage() {
	return (
		<div className="min-h-screen grid place-content-center">
			<Loader2 className="h-4 w-4 animate-spin" />
		</div>
	);
}
