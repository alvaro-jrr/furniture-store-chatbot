import { z } from "zod";

import { Register, UserCredentials, userSchema } from "@/shared/schema";
import { makeResponseSchema } from "@/shared/utils";

export async function register(register: Register) {
	try {
		const response = await fetch("http://localhost:3000/users/sign-up", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(register),
		});

		const parsedResponse = makeResponseSchema(
			userSchema.extend({
				token: z.string(),
			}),
		).safeParse(await response.json());

		if (!parsedResponse.success) return null;

		// Store the user token.
		if (parsedResponse.data.data !== undefined) {
			setToken(parsedResponse.data.data.token);
		}

		return parsedResponse.data;
	} catch (error) {
		console.log("There was an error", error);
		return null;
	}
}

export async function login(credentials: UserCredentials) {
	try {
		const response = await fetch("http://localhost:3000/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		});

		const parsedResponse = makeResponseSchema(
			userSchema
				.extend({
					token: z.string(),
				})
				.optional(),
		).safeParse(await response.json());

		if (!parsedResponse.success) return null;

		// Store the user token.
		if (parsedResponse.data.data !== undefined) {
			setToken(parsedResponse.data.data.token);
		}

		return parsedResponse.data;
	} catch (error) {
		console.log("There was an error", error);
		return null;
	}
}

export async function logout({ token }: { token: string }) {
	try {
		const response = await fetch("http://localhost:3000/users/logout", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.ok;
	} catch (error) {
		console.log("There was an error", error);
		return false;
	}
}

export async function getUser({ token }: { token: string }) {
	try {
		const response = await fetch("http://localhost:3000/users/me", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const parsedResponse = makeResponseSchema(userSchema).safeParse(
			await response.json(),
		);

		if (!parsedResponse.success) return null;

		return parsedResponse.data.data;
	} catch (error) {
		console.log("There was an error", error);
		return null;
	}
}

export function getToken() {
	return localStorage.getItem("token") ?? "";
}

export function setToken(token: string) {
	localStorage.setItem("token", token);
}
