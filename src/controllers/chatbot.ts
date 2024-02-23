import { z } from "zod";

import {
	MessageInput,
	chatbotResponseSchema,
	messageSchema,
} from "@/shared/schema";
import { makeResponseSchema } from "@/shared/utils";
import { AuthedRequest } from "@/types";

export async function sendMessage({
	token,
	message,
}: AuthedRequest<{ message: MessageInput }>) {
	try {
		const response = await fetch("http://localhost:3000/chatbot", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(message),
		});

		const parsedResponse = makeResponseSchema(
			chatbotResponseSchema.optional(),
		).safeParse(await response.json());

		if (!parsedResponse.success) return null;

		return parsedResponse.data.data;
	} catch (error) {
		console.log("There was an error", error);
		return null;
	}
}

export async function getMessages({ token }: { token: string }) {
	try {
		const response = await fetch("http://localhost:3000/chatbot/messages", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const parsedResponse = makeResponseSchema(
			z.array(messageSchema),
		).safeParse(await response.json());

		return parsedResponse.success ? parsedResponse.data.data : [];
	} catch (error) {
		console.log("There was an error", error);
		return [];
	}
}
