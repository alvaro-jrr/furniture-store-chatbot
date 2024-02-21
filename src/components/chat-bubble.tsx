import { cn } from "@/lib/utils";
import { Message } from "@/types";

export function ChatBubble({
	message: { text, isOwner },
}: {
	message: Message;
}) {
	return (
		<div
			className={cn(
				"max-w-[60vw] py-2 px-4 rounded-full",
				isOwner ? "bg-blue-500 text-white" : "bg-muted-foreground/10",
			)}
		>
			{text}
		</div>
	);
}
