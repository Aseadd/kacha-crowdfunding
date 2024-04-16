import * as yup from "yup";
import { passwordValidator } from ".";

const changePasswordValidator = yup.object().shape({
    current_password: yup
        .string()
        .required("Current password is required")
        .test("password-validator", "Minimum 6 characters, at least one number, and special character", passwordValidator),
    new_password: yup
        .string()
        .required("New password is required")
        .test("password-validator", "Minimum 6 characters, at least one number, and special character", passwordValidator),
    password_confirmation: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("new_password")], "Password must match"),
});

export default changePasswordValidator;
