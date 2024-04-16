import { createSlice } from "@reduxjs/toolkit";

interface IModalState {
  loginModal: boolean;
  signUpModal: boolean;
  forgotPasswordModal: boolean;
  mainMenuDrawer: boolean;
  registrationConfirmModal: boolean;
}
const initialState: IModalState = {
  loginModal: false,
  signUpModal: false,
  forgotPasswordModal: false,
  mainMenuDrawer: false,
  registrationConfirmModal: false,
};
export const stateName = "modals";

export const ModalSlice = createSlice({
  initialState,
  name: stateName,
  reducers: {
    openLoginModal: (state) => {
      state.loginModal = true;
      state.signUpModal = false;
      state.mainMenuDrawer = false;
    },
    closeLoginModal: (state) => {
      state.loginModal = false;
    },
    openSignUpModal: (state) => {
      state.loginModal = false;
      state.signUpModal = true;
    },
    closeSignUpModal: (state) => {
      state.signUpModal = false;
    },
    openForgotPasswordModal: (state) => {
      state.forgotPasswordModal = true;
      state.loginModal = false;
    },
    closeForgotPasswordModal: (state) => {
      state.forgotPasswordModal = false;
    },

    openRegisterConfirmModal: (state) => {
      state.signUpModal = false;
      state.registrationConfirmModal = true;
    },
    closeRegisterConfirmModal: (state) => {
      state.registrationConfirmModal = false;
    },
    openMainMenuDrawer: (state) => {
      state.mainMenuDrawer = true;
    },
    closeMainMenuDrawer: (state) => {
      state.mainMenuDrawer = false;
    },
  },
});

export const selectLoginModal = (state: { [stateName]: IModalState }) =>
  state[stateName].loginModal;
export const selectSignUpModal = (state: { [stateName]: IModalState }) =>
  state[stateName].signUpModal;
export const selectForgotPasswordModal = (state: {
  [stateName]: IModalState;
}) => state[stateName].forgotPasswordModal;
export const selectMainMenuDrawer = (state: { [stateName]: IModalState }) =>
  state[stateName].mainMenuDrawer;
export const selectRegisterConfirmModal = (state: {
  [stateName]: IModalState;
}) => state[stateName].registrationConfirmModal;
export const selectAuthModal = (state: { [stateName]: IModalState }) =>
  state[stateName].loginModal ||
  state[stateName].signUpModal ||
  state[stateName].forgotPasswordModal;

export const {
  closeLoginModal,
  closeSignUpModal,
  openLoginModal,
  openSignUpModal,
  closeForgotPasswordModal,
  openForgotPasswordModal,
  closeMainMenuDrawer,
  openMainMenuDrawer,
  closeRegisterConfirmModal,
  openRegisterConfirmModal,
} = ModalSlice.actions;
