/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
	isAuthenticated: boolean;
	userData: any;
	token: string | null;
	isVendor: boolean;
	isAdmin:boolean
}

const initialState: AuthState = {
	isAuthenticated: false,
	userData: null,
	token: null,
	isVendor: false,
	isAdmin:false
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
		},
		setAdmin: (state, action) => {
			state.isAdmin = action.payload;
		}
	},
});

export const {
	login,
	logout,
	setToken,
	setVendor,
	setAdmin
} = authSlice.actions;
export default authSlice.reducer;
