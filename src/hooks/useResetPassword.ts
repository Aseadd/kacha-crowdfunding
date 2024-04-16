import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetPasswordPostMutation } from "src/api/data";
import { useNotificationContext } from "src/context/NotificationContext";
import { IResetPassword, IResetPasswordResponse } from "src/model/auth";
import { openLoginModal } from "src/store/states/modal";
import resetPasswordValidator from "src/validator/resetPassword";

export default function useResetPassword() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const { handleSubmit, control } = useForm<IResetPassword>({
    resolver: yupResolver(resetPasswordValidator),
  });
  const [resetPasswordAction, { isLoading }] = useResetPasswordPostMutation();
  const [searchParams] = useSearchParams();
  const { showError, showSuccess } = useNotificationContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchParams.get("reset_token")) setError("Token not found!");
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  const onSubmit = async (input: IResetPassword) => {
    try {
      const response: IResetPasswordResponse = await resetPasswordAction({
        ...input,
        token: searchParams.get("reset_token")!,
      }).unwrap();
      if (response.status_code === 200) {
        showSuccess({ message: response.message });
        navigate("/");
        dispatch(openLoginModal());
      } else {
        showError({ message: response?.message ?? "Network error" });
      }
    } catch (error: any) {
      showError({ message: error?.data?.detail ?? "Network error" });
    }
  };

  return {
    onSubmit,
    control,
    loading,
    error,
    handleSubmit,
    isLoading,
  };
}
