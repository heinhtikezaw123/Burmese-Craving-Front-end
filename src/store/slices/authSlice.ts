/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
	isAuthenticated: boolean;
	userData: any;
	token: string | null;
	isVendor: boolean;
}

const initialState: AuthState = {
	isAuthenticated: true,
	userData: null,
	token: null,
	isVendor: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true;
			state.userData = action.payload;
		},
		logout: () => initialState,
		setToken: (state, action) => {
			state.token = action.payload;
		},
		setVendor: (state, action) => {
			state.isVendor = action.payload;
		}
	},
});

export const {
	login,
	logout,
	setToken,
	setVendor
} = authSlice.actions;
export default authSlice.reducer;
