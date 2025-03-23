import React, { useState, useEffect, FormEvent, useCallback } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/store";
import { loginFailure, loginStart, loginSuccess } from "../store/slices/authSlice";
import ThemeToggle from "../components/UI/ThemeToggle";
import { PrimaryButton } from "../components/UI/PrimaryButton";
import { InputLabel } from "../components/UI/InputLabel";
import { Input } from "../components/UI/Input";
import { InputError } from "../components/UI/InputError";
import { useValidateEmail } from "../hooks/useValidateEmail";
import { ErrorMessages } from "../interfaces";

const SignInPage: React.FC = () => {
	const navigate = useNavigate();
  	const dispatch = useAppDispatch();
  	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  	const errors = useAppSelector((state) => state.auth.errors);
  	const loading = useAppSelector((state) => state.auth.loading);

  	const [email, setEmail] = useState<string>("");
  	const [password, setPassword] = useState<string>("");

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated, navigate]);

	const validateForm = useCallback((): ErrorMessages => {
		const newErrors: ErrorMessages = {};
		if (!email.trim()) newErrors.email = "Email is required";
		else if (!useValidateEmail(email)) newErrors.email = "Invalid email format";

		if (!password.trim()) newErrors.password = "Password is required";
		else if (password.length < 4) newErrors.password = "Password must be at least 4 characters long";

		return newErrors;
	}, [email, password]);

  	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		dispatch(loginFailure({}));

		const formErrors = validateForm();
		if (Object.keys(formErrors).length > 0) {
			dispatch(loginFailure(formErrors)); 
			return;
		}

		dispatch(loginStart());
		await new Promise((resolve) => setTimeout(resolve, 1000));

		if (email.trim() === "test@test.test" && password === "password") {
			const userData = {
				email: email.trim(),
				name: email.split("@")[0],
				id: Math.random(),
				role: "user",
			};
			dispatch(loginSuccess(userData));
		} else {
			dispatch(loginFailure({ general: "User not found" }));
		}
	};

  	return (
		<div className="h-screen bg-gray-50 dark:bg-black">
			<div className="flex justify-end pt-4 pr-4">
				<ThemeToggle />
			</div>

			<div className="h-[93vh] flex items-center justify-center">
				<div className="w-full max-w-md">
					<div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8">
						<h1 className="text-2xl font-bold text-gray-800 text-center mb-6 dark:text-white">Sign In</h1>

						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<InputLabel htmlFor="email" text="Email address" />
								<Input
									type="text"
									id="email"
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									loading={loading}
								/>
								<InputError error={errors?.email} />
							</div>

							<div className="mb-6">
								<InputLabel htmlFor="password" text="Password" />
								<Input
								type="password"
								id="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								loading={loading}
								/>
								<InputError error={errors?.password} />
							</div>

							<div className="mb-2">
								<InputError error={errors?.general} />
							</div>

							<PrimaryButton text="Sign in" loading={loading} />
						</form>
					</div>
				</div>
			</div>
		</div>
  	);
};

export default SignInPage;







