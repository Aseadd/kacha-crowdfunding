import * as yup from "yup";

const commentValidator = yup.object().shape({
    comment: yup.string().required("Comment is required"),
});

export default commentValidator;
