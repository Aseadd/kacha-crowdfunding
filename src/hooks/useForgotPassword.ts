import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useReSendResetPasswordEmailMutation } from "src/api/data";
import { useNotificationContext } from "src/context/NotificationContext";
import { IForgotPasswordResponse } from "src/model/auth";

export default function useForgotPassword() {
  const [resendResetPasswordEmailAction, { isLoading }] =
    useReSendResetPasswordEmailMutation();
  const { showError, showSuccess } = useNotificationContext();
  const [data, setData] = useState<{ email: string; token: string }>();
  const state = useLocation().state;
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.email && state?.token)
      setData({ email: state.email, token: state.token });
    else {
      showError({ message: "Fotgot password not initiated" });
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const onSubmit = async () => {
    try {
      const response: IForgotPasswordResponse =
        await resendResetPasswordEmailAction(data!.token).unwrap();
      if (response.status_code === 200) {
        showSuccess({ message: response.message });
        setData((prev) =>
          prev
            ? { ...prev, token: response.data.resend_token }
            : { email: "", token: response.data.resend_token }
        );
      } else {
        showError({ message: response?.message ?? "Network error" });
      }
    } catch (error: any) {
      showError({ message: error?.data?.detail ?? "Network error" });
    }
  };

  return {
    isLoading,
    onSubmit,
    data,
  };
}
