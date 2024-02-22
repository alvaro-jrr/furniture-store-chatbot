import { useNavigate } from "react-router-dom";
import useSWR from "swr";

import { getToken, getUser, logout } from "@/controllers/users";

export const useUser = () => {
	const { data, isLoading, mutate } = useSWR("/me", async () => {
		return await getUser({ token: getToken() });
	});
	const navigate = useNavigate();

	// Logs out the user.
	const logoutUser = async () => {
		await logout({ token: getToken() });
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
