import { z } from "zod";

export const messageInputSchema = z.object({
	text: z.string().min(1, "Debe ingresar un mensaje"),
});

export type MessageInput = z.infer<typeof messageInputSchema>;

export const messageSchema = z.object({
	id: z.number(),
	userId: z.number(),
	createdAt: z.string(),
	text: z.string(),
	type: z.enum(["USER", "AI"]),
});

export type Message = z.infer<typeof messageSchema>;

export const chatbotResponseSchema = z.object({
	question: messageSchema,
	answer: messageSchema,
});
