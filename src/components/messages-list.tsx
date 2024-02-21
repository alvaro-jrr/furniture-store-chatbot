import { Message } from "@/types";

import { ChatBubble } from "./chat-bubble";

export function MessagesList({ messages }: { messages: Message[] }) {
	return (
		<ul className="flex-1 flex flex-col items-end gap-2 w-full">
			{messages.map((message) => (
				<div className={message.isOwner ? "self-end" : "self-start"}>
					<ChatBubble key={message.id} message={message} />
				</div>
			))}
		</ul>
	);
}
