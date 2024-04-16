import * as yup from "yup";
import { fullNameValidator, phoneNumberValidator } from ".";

const userUpdateValidator = yup.object().shape({
    fullName: yup
        .string()
        .required("First Name is required")
        .test("full-name", "Invalid full name. e.g. 'Abel Kebede Chala", fullNameValidator),
    email: yup.string().email("Invalid email address").required("Email is required"),
    phone: yup.string().required("Phone Number is required").test("phone-validator", "Invalid phone number", phoneNumberValidator),
    address: yup.string().nullable(),
});

export default userUpdateValidator;
