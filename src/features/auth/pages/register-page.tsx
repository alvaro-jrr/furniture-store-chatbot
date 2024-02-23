import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";

import GuestLayout from "@/components/guest-layout";
import { LoadingPage } from "@/components/loading-page";
import { TextField } from "@/components/text-field";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { register as registerUser } from "@/controllers/users";
import { useUser } from "@/hooks/use-user";
import { Register, registerSchema } from "@/shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function RegisterPage() {
	const { user, mutate, isLoading } = useUser();
	const { toast } = useToast();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Register>({
		resolver: zodResolver(registerSchema),
		values: {
			fullName: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<Register> = async (register) => {
		const response = await registerUser(register);

		if (!response) {
			toast({ description: "Ha ocurrido un error inesperado" });
			return;
		}

		if (!response.data) {
			toast({
				description:
					response.status === 409
						? "Email ya está tomado"
						: "Ha ocurrido un error inesperado",
			});
			return;
		}

		toast({
			description: "Ha creado su cuenta con éxito",
		});

		const { id, email, fullName, role } = response.data;

		// Update user
		mutate({
			email,
			fullName,
			id,
			role,
		});
	};

	if (isLoading) return <LoadingPage />;

	// Go to chatbot.
	if (user) return <Navigate to="/chatbot" />;

	return (
		<GuestLayout title="Crea tu cuenta">
			<form
				method="post"
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-6"
			>
				<div className="space-y-4">
					<TextField
						id="full-name"
						labelProps={{
							children: "Nombre completo",
						}}
						inputProps={{
							type: "text",
							placeholder: "ej: John Doe",
							autoComplete: "name",
							...register("fullName"),
						}}
						errorMessage={errors.fullName?.message}
					/>

					<TextField
						id="email"
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
							autoComplete: "new-password",
							...register("password"),
						}}
						errorMessage={errors.password?.message}
					/>
				</div>

				<Button disabled={isSubmitting} className="w-full">
					{isSubmitting ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : null}

					<span>Crear cuenta</span>
				</Button>

				<Separator />

				<p className="text-muted-foreground text-sm text-center">
					¿Ya tienes una cuenta?{" "}
					<Link to="/login" className="text-blue-500">
						Inicia sesión
					</Link>
				</p>
			</form>
		</GuestLayout>
	);
}
