import React from "react";
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Candidates from "./components/Candidates";
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
function App() {
    return (
        // allows all of our components to access store
        <Provider store={store}>
            <ToastProvider autoDismiss={true}>
                <Container maxWidth="lg">
                    <Candidates />
                </Container>
            </ToastProvider>
        </Provider>
    );
}

export default App;
