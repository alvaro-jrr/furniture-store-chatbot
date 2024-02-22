import { useNavigate } from "react-router-dom";
import useSWR from "swr";

import { getToken, getUser, logout } from "@/controllers/users";

export const useUser = () => {
	const token = getToken();
	const { data, isLoading, mutate } = useSWR("/me", () => getUser({ token }));
	const navigate = useNavigate();

	// Logs out the user.
	const logoutUser = async () => {
		await logout({ token });
		mutate(null);
		return navigate("/login");
	};

	return {
		isLoading,
		mutate,
		logout: logoutUser,
		user: data,
	};
};
