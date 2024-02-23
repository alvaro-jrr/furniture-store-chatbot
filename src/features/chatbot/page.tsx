import { Loader2, Send } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";

import { MessagesList } from "@/components/messages-list";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { getMessages, sendMessage } from "@/controllers/chatbot";
import { getToken } from "@/controllers/users";
import { MessageInput, messageInputSchema } from "@/shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function ChatbotPage() {
	const token = getToken();
	const { toast } = useToast();
	const { isLoading, data, mutate } = useSWR(
		"messages",
		async () => await getMessages({ token }),
	);

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
		reset,
	} = useForm<MessageInput>({
		resolver: zodResolver(messageInputSchema),
		values: {
			text: "",
		},
	});

	// Handle message submit.
	const onSubmit: SubmitHandler<MessageInput> = async (message) => {
		const response = await sendMessage({
			token,
			message,
		});

		if (!response) {
			toast({
				title: "Envío de mensaje",
				description:
					"Ha ocurrido un error al enviar mensaje, intenta más tarde",
			});
			return;
		}

		// Reset input and add messages.
		reset({ text: "" });
		mutate((data ?? []).concat([response.question, response.answer]));
	};

	return (
		<PageLayout
			headerProps={{
				title: "Chatbot",
				description:
					"Obtén información de la mueblería a través de nuestro chatbot",
			}}
		>
			<div className="flex flex-col flex-1">
				<div className="flex-1">
					{isLoading ? (
						<div className="h-full w-full grid place-content-center">
							<Loader2 className="h-4 w-4 animate-spin" />
						</div>
					) : (
						<ScrollArea className="h-[70vh] pr-4">
							<MessagesList messages={data ?? []} />
						</ScrollArea>
					)}
				</div>

				<form
					method="post"
					onSubmit={handleSubmit(onSubmit)}
					autoComplete="off"
					className="flex gap-2 w-full"
				>
					<Input
						placeholder="Ingresa una pregunta"
						disabled={isSubmitting}
						{...register("text")}
					/>

					<Button size="icon" type="submit">
						{isSubmitting ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<Send className="h-4 w-4" />
						)}
					</Button>
				</form>
			</div>
		</PageLayout>
	);
}
