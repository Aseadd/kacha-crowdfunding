import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { router } from "src/routes";
import { NotificationContextProvider } from "src/context/NotificationContext";
import store from "src/store";
import ThemeProvider from "./theme/ThemeProvider";

function App() {
    return (
        <ThemeProvider>
            <ReduxProvider store={store}>
                <NotificationContextProvider>
                    <RouterProvider router={router} />
                </NotificationContextProvider>
            </ReduxProvider>
        </ThemeProvider>
    );
}

export default App;
