import * as yup from "yup";

const donateValidator = yup.object().shape({
    amount: yup.number().required("Amount is required").typeError("Amount is required and must be a number"),
    currency: yup.string().required("Currency is required"),
    payment_method: yup.string().required("Payment Method is required"),
    isAnonymous: yup.boolean().required("Donate Anonymously is required").default(false),
    comment: yup.string().nullable(),
});

export default donateValidator;
