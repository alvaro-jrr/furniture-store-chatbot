import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import GuestLayout from "@/components/guest-layout";
import { LoadingPage } from "@/components/loading-page";
import { TextField } from "@/components/text-field";
import { Button } from "@/components/ui/button";
import { login } from "@/controllers/users";
import { useUser } from "@/hooks/use-user";
import { UserCredentials, userCredentialsSchema } from "@/shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function LoginPage() {
	const { user, mutate, isLoading } = useUser();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<UserCredentials>({
		resolver: zodResolver(userCredentialsSchema),
		values: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<UserCredentials> = async (
		userCredentials,
	) => {
		const user = await login(userCredentials);

		if (user === null) return;

		// Update user
		mutate(user);
	};

	if (isLoading) return <LoadingPage />;

	// Go to chatbot.
	if (user) return <Navigate to="/chatbot" />;

	return (
		<GuestLayout title="Inicio de Sesión">
			<form
				method="post"
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-6"
			>
				<div className="space-y-4">
					<TextField
						id="username"
						labelProps={{
							children: "Email",
						}}
						inputProps={{
							type: "text",
							placeholder: "ej: johndoe@gmail.com",
							autoComplete: "email",
							...register("email"),
						}}
						errorMessage={errors.email?.message}
					/>

					<TextField
						id="password"
						labelProps={{
							children: "Contraseña",
						}}
						inputProps={{
							type: "password",
							placeholder: "ej: 12345678",
							autoComplete: "current-password",
							...register("password"),
						}}
						errorMessage={errors.password?.message}
					/>
				</div>

				<Button disabled={isSubmitting} className="w-full">
					{isSubmitting ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : null}

					<span>Iniciar Sesión</span>
				</Button>
			</form>
		</GuestLayout>
	);
}
