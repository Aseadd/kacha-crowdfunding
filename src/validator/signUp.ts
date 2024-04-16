import * as yup from "yup";
import { fullNameValidator, passwordValidator, phoneNumberValidator } from ".";

const signUpValidator = yup.object().shape({
    fullName: yup
        .string()
        .required("First Name is required")
        .test("full-name", "Invalid full name. e.g. 'Abel Kebede Chala", fullNameValidator),
    email: yup.string().email("Invalid email address").required("Email is required"),
    phone: yup.string().required("Phone Number is required").test("phone-validator", "Invalid phone number", phoneNumberValidator),
    address: yup.string().nullable(),
    password: yup
        .string()
        .required("Password is required")
        .test("password-validator", "Minimum 6 characters, at least one number, and special character", passwordValidator),
    password_confirmation: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("password")], "Password must match"),
    accept_term: yup.boolean().isTrue("You must accept the terms and conditions"),
    accept_policy: yup.boolean().isTrue("You must accept the policies"),
});

export default signUpValidator;

export const botSignUpValidator = yup.object().shape({
    fullName: yup
        .string()
        .required("First Name is required")
        .test("full-name", "Invalid full name. e.g. 'Abel Kebede Chala", fullNameValidator),
    email: yup.string().email("Invalid email address").required("Email is required"),
    address: yup.string().nullable(),
    password: yup
        .string()
        .required("Password is required")
        .test("password-validator", "Minimum 6 characters, at least one number, and special character", passwordValidator),
    password_confirmation: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("password")], "Password must match"),
    accept_term: yup.boolean().isTrue("You must accept the terms and conditions"),
    accept_policy: yup.boolean().isTrue("You must accept the policies"),
});
