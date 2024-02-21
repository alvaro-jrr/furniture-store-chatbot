import { Send } from "lucide-react";

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

export function ChatbotPage() {
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
					<ScrollArea className="h-[70vh] pr-4">
						<MessagesList
							messages={[
								{
									id: 1,
									isOwner: true,
									text: "¿Cuantos muebles hay en venta?",
								},
								{
									id: 2,
									isOwner: false,
									text: "Hay 4 muebles en venta",
								},
								{
									id: 3,
									isOwner: true,
									text: "¿Cuantos empleados hay contratados?",
								},
								{
									id: 4,
									isOwner: false,
									text: "Hay 10 empleados contratados",
								},
							]}
						/>
					</ScrollArea>
				</CardContent>

				<CardFooter className="flex gap-2 w-full">
					<Input placeholder="Ingresa una pregunta" />

					<Button size="icon">
						<Send className="h-4 w-4" />
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
