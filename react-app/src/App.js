import React from "react";
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Candidates from "./components/Candidates";
import { Container } from "@material-ui/core";

function App() {
    return (
        // allows all of our components to access store
        <Provider store={store}>
            <Container maxWidth="lg">
                <Candidates />
            </Container>
        </Provider>
    );
}

export default App;
