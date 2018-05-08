import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Overview from "./Overview";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
          <Overview />
        </div>
      </div>
    );
  }
}

export default App;
