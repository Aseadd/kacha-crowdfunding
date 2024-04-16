import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "src/model/auth";

export interface IAuthState {
  user: null | IUser;
  isLoggedIn: boolean;
  registerEmail: null | string;
  activateToken?: string;
}

const initialState: IAuthState = {
  user: null,
  isLoggedIn: false,
  registerEmail: null,
};
export const stateName = "auth";

export const AuthSlice = createSlice({
  initialState,
  name: stateName,
  reducers: {
    setAuth: (state, { payload }: { payload: IUser }) => {
      state.isLoggedIn = true;
      state.user = payload;
    },
    updateUser: (state, { payload }: { payload: IUser }) => {
      if (state.user) {
        state.user.firstname = payload.firstname;
        state.user.lastname = payload.lastname;
        state.user.middlename = payload.middlename;
        state.user.email = payload.email;
        state.user.phone = payload.phone;
        state.user.address = payload.address;
      }
    },
    setProfileImage: (state, { payload }: { payload: string }) => {
      if (state.user) state.user.profile = payload;
    },
    setAuthLogin: (state) => {
      state.isLoggedIn = true;
    },

    setRegisterEmailAndToken: (
      state,
      { payload }: { payload: { email?: string; token: string } }
    ) => {
      if (payload.email) state.registerEmail = payload.email;
      state.activateToken = payload.token;
    },
    resetAuth: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const selectAuth = (state: { [stateName]: IAuthState }): IAuthState =>
  state[stateName];
export const selectActivationToken = (state: { [stateName]: IAuthState }) =>
  state[stateName].activateToken;

export const selectRegisterEmail = (state: {
  [stateName]: IAuthState;
}): string | null => state[stateName].registerEmail;

export const {
  resetAuth,
  setAuth,
  setAuthLogin,
  setProfileImage,
  updateUser,
  setRegisterEmailAndToken,
} = AuthSlice.actions;
