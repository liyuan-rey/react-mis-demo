import React, { Component } from "react";
import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComp: ""
    };
  }

  render() {
    return (
      <div class="nav-box">
        <div class="toggle">
          <a href="#">| | |</a>
        </div>
        <div class="nav-list">
          <div class="nav-item">
            <a href="#">警情管理</a>
          </div>
          <div class="nav-item">
            <a href="#">应急管理</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
