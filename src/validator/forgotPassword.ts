import * as yup from "yup";

const forgotPasswordValidator = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email is required"),
});

export default forgotPasswordValidator;
