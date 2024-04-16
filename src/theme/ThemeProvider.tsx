import { ConfigProvider } from "antd";
import { ReactNode } from "react";

interface IProps {
    children: ReactNode;
}

export default function ThemeProvider({ children }: IProps) {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary: "#DB5E00",
                        colorPrimaryBg: "#DB5E00",
                        colorPrimaryHover: "#DB5E00",
                        colorPrimaryActive: "#DB5E00",
                        colorLinkHover: "#DB5E00",
                        colorLink: "#DB5E00",
                    },
                    Input: { colorPrimary: "#DB5E00", algorithm: true },
                    Tabs: { colorPrimary: "#FFCC00" },
                    Radio: { colorPrimary: "#FFCC00" },
                },
                token: { colorPrimary: "#DB5E00" },
            }}>
            {children}
        </ConfigProvider>
    );
}

export function CategoryCheckBoxThemeProvider({ children }: IProps) {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: { colorPrimary: "#DB5E00", colorPrimaryBg: "#DB5E00" },
                    Input: { colorPrimary: "#DB5E00", algorithm: true },
                    Tabs: { colorPrimary: "#FFCC00" },
                    Radio: { colorPrimary: "#FFCC00" },
                    Checkbox: { colorPrimary: "#FFCC00" },
                },
                token: { colorPrimary: "#DB5E00" },
            }}>
            {children}
        </ConfigProvider>
    );
}
