import React, { Component } from "react";
import "./App.css";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
// import Overview from "./Overview";
import Incident from "./Incident";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Topbar />
        </div>
        <div className="App-nav">
          <Sidebar />
        </div>
        <div className="App-content">
          <Incident />
        </div>
      </div>
    );
  }
}

export default App;
