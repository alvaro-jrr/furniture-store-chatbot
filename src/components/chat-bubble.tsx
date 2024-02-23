import { cn } from "@/lib/utils";
import { Message } from "@/shared/schema";

export function ChatBubble({ message: { text, type } }: { message: Message }) {
	return (
		<div
			className={cn(
				"max-w-[60vw] px-4 py-2 rounded-md whitespace-pre-line",
				type === "USER"
					? "bg-blue-500 text-white"
					: "bg-muted-foreground/10",
			)}
		>
			{text}
		</div>
	);
}
