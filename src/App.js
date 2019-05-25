import React, { Component } from "react";
import Routes from "./Routes";
import { ProjectListProvider } from "./providers/project-list-provider";

class App extends Component {
  render() {
    return (
      <ProjectListProvider>
        <Routes />
      </ProjectListProvider>
    );
  }
}

export default App;
