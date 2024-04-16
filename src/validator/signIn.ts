import * as yup from "yup";
import { passwordValidator } from ".";

const signInValidator = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .test("password-validator", "Minimum 6 characters, at least one number, and special character", passwordValidator),
    remember: yup.boolean().nullable(),
});

export default signInValidator;

export const botSignInValidator = yup.object().shape({
    password: yup
        .string()
        .required("Password is required")
        .test("password-validator", "Minimum 6 characters, at least one number, and special character", passwordValidator),
});
