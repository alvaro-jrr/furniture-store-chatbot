import { cn } from "@/lib/utils";

import { InputError } from "./input-error";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Props {
	id: string;
	labelProps: Omit<
		React.LabelHTMLAttributes<HTMLLabelElement>,
		"className" | "id"
	>;
	inputProps: Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"className" | "id" | "name"
	>;
	errorMessage?: string;
	className?: string;
	isOptional?: boolean;
}

export function TextField({
	id,
	labelProps,
	inputProps,
	errorMessage,
	className,
	isOptional = false,
}: Props) {
	return (
		<div className={cn("space-y-2", className)}>
			<div className="flex items-center justify-between">
				<Label htmlFor={id} {...labelProps}></Label>

				{isOptional ? (
					<span className="text-sm text-muted-foreground">
						Opcional
					</span>
				) : null}
			</div>

			<Input
				id={id}
				name={id}
				aria-invalid={errorMessage ? true : false}
				{...inputProps}
			/>

			<InputError message={errorMessage} />
		</div>
	);
}
