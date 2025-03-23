import { logout } from "../../store/slices/authSlice";
import { useAppDispatch } from "../../store/store";


const LogoutButton = () => {
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(logout());
		window.location.reload();
	};

	return (
		<button onClick={handleLogout} className="hover:opacity-60 transition-opacity px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded cursor-pointer">
			Logout
		</button>
	);
};

export default LogoutButton;