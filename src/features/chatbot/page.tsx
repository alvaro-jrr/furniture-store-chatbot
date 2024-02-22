import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

import { MessagesList } from "@/components/messages-list";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getMessages, sendMessage } from "@/controllers/chatbot";
import { getToken } from "@/controllers/users";

export function ChatbotPage() {
	const token = getToken();

	const { isLoading, data, mutate } = useSWR(
		"messages",
		async () => await getMessages({ token }),
	);

	const [message, setMessage] = useState("");

	// Handle message submit.
	const onSubmitMessage = async () => {
		if (!message.trim().length) return;

		const response = await sendMessage({
			token,
			message: { text: message },
		});

		setMessage("");

		if (response === null || response === undefined) return;

		mutate((data ?? []).concat([response.question, response.answer]));
	};

	return (
		<div className="container min-h-screen flex p-6">
			<Card className="flex flex-col flex-1">
				<CardHeader>
					<CardTitle className="text-2xl">Chat</CardTitle>

					<CardDescription>
						Obtén información de la mueblería a través de nuestro
						chatbot.
					</CardDescription>
				</CardHeader>

				<CardContent className="flex-1">
					{isLoading ? (
						<div className="h-full w-full grid place-content-center">
							<Loader2 className="h-4 w-4 animate-spin" />
						</div>
					) : (
						<ScrollArea className="h-[70vh] pr-4">
							<MessagesList messages={data ?? []} />
						</ScrollArea>
					)}
				</CardContent>

				<form
					onSubmit={(event) => {
						onSubmitMessage();
						event.preventDefault();
					}}
				>
					<CardFooter className="flex gap-2 w-full">
						<Input
							placeholder="Ingresa una pregunta"
							value={message}
							onChange={(event) => setMessage(event.target.value)}
						/>

						<Button size="icon" type="submit">
							<Send className="h-4 w-4" />
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
