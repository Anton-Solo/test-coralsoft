import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: localStorage.getItem("user") !== null,
  	user: JSON.parse(localStorage.getItem("user") || "null"),
	loading: false,
	errors: null,
	data: {},
	status: "idle",
	userInfo: {
		email: "",
		name: "",
		id: null,
		role: "",
	},
};

const authSlice = createSlice({
	name: "authentication",
	initialState: initialState,
	reducers: {
		loginStart(state) {
			state.loading = true;
			state.errors = null;
			state.status = "loading";
			state.data = {};
		},
		loginSuccess(state, { payload }) {
			state.isAuthenticated = true;
			state.user = payload;
			state.loading = false;
			state.errors = null;
			state.status = "succeeded";
			state.data = payload;
			state.userInfo = {
				...state.userInfo,
				...payload,
			};
			localStorage.setItem("user", JSON.stringify(payload));
		},
		loginFailure(state, { payload }) {
			state.loading = false;
			state.errors = payload;
			state.status = "failed";
			state.data = {};
			state.user = null;
		},
		logout(state) {
			localStorage.removeItem("user");
			return initialState;
		},
		updateUserInfo(state, { payload }) {
			state.userInfo = {
				...state.userInfo,
				...payload,
			};
			state.user = {
				...state.user,
				...payload,
			};
			state.data = {
				...state.data,
				...payload,
			};
		},
	},
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	logout,
	updateUserInfo,
} = authSlice.actions;
export default authSlice.reducer;
