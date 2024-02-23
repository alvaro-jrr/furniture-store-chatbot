import { useEffect, useRef } from "react";

import type { Message } from "@/shared/schema";

import { ChatBubble } from "./chat-bubble";

export function MessagesList({ messages }: { messages: Message[] }) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messages.length) {
			ref.current?.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	}, [messages.length]);

	return (
		<div className="flex-1">
			<ul className="flex-1 flex flex-col items-end gap-2 w-full">
				{messages.map((message) => (
					<li
						key={message.id}
						className={
							message.type === "USER" ? "self-end" : "self-start"
						}
					>
						<ChatBubble message={message} />
					</li>
				))}
			</ul>

			<div ref={ref}></div>
		</div>
	);
}
