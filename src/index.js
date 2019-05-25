import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import {
  // DarkTheme,
  ThemeProvider,
  createTheme,
  lightThemePrimitives
} from "baseui";

import "./index.css";
import App from "./App";
import { unregister } from "./registerServiceWorker";

const engine = new Styletron();

const theme = createTheme({
  ...lightThemePrimitives,
  // add all the properties here you'd like to override from the light theme primitives
  // primary400: "#e65100",
  mono1000: "#555555"
});

// console.log(theme);

ReactDOM.render(
  <Router>
    <StyletronProvider value={engine}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyletronProvider>
  </Router>,
  document.getElementById("root")
);

unregister();
