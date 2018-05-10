import React, { Component } from "react";
import logo from "./logo.svg";
import "./Topbar.css";
import svc from "./sdk/ClientSDK";

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeCount: svc.getIncidentCount(),
      username: svc.getCurrentUser().username
    };
  }

  render() {
    return (
      <div>
        <div className="logo pull-left">
          <img src={logo} width="50px" height="50px" alt="logo" />
        </div>
        <div className="title pull-left">React MIS Demo</div>
        <div className="info pull-right">
          <div className="notice pull-left">{this.state.noticeCount}</div>
          <div className="user pull-left">{this.state.username}</div>
        </div>
      </div>
    );
  }
}

export default Topbar;
