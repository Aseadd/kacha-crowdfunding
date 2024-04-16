import useNotification from "antd/es/notification/useNotification";
import { ReactNode, createContext, useContext } from "react";

export interface IMessage {
    message: string;
}
type NotificationContextType = {
    showSuccess: ({ message }: IMessage) => void;
    showError: ({ message }: IMessage) => void;
};

export const NotificationContext = createContext<NotificationContextType>({} as NotificationContextType);
export function useNotificationContext() {
    return useContext(NotificationContext);
}

export function NotificationContextProvider({ children }: { children: ReactNode }) {
    const [api, contextHolder] = useNotification();

    const showSuccess = ({ message }: IMessage) => {
        api.success({ message });
    };
    const showError = ({ message }: IMessage) => {
        api.error({ message });
    };

    return (
        <NotificationContext.Provider value={{ showSuccess, showError }}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
}
