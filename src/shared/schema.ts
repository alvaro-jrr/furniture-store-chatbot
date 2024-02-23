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

export const userSchema = z.object({
	id: z.number(),
	fullName: z.string().min(1, { message: "Debe ingresar su nombre" }),
	email: z
		.string()
		.min(1, { message: "Debe ingresar un email " })
		.email({ message: "Debe ingresar un email valido" }),
	role: z.enum(["ADMIN", "USER"]),
});

export const registerSchema = userSchema
	.pick({ fullName: true, email: true })
	.extend({
		password: z
			.string()
			.min(6, { message: "Debe ser mayor a 6 caracteres" }),
	});

export type Register = z.infer<typeof registerSchema>;

export const userCredentialsSchema = registerSchema.pick({
	email: true,
	password: true,
});

export type UserCredentials = z.infer<typeof userCredentialsSchema>;
