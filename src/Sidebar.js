import React, { Component } from "react";
import "./Sidebar.css";
import _ from "lodash";

const navData = [
  {
    title: "警情管理",
    items: [{ label: "当前警情", uri: "" }, { label: "历史警情", uri: "" }],
    active: true
  },
  {
    title: "资源管理",
    items: [
      { label: "资源人", uri: "" },
      { label: "资源车", uri: "" },
      { label: "资源物资", uri: "" }
    ],
    active: false
  }
];

function NavPage(props) {
  const page = props.page;
  return (
    <div
      className={["nav-page", page.active ? "nav-page-active" : ""].join(" ")}
    >
      <div className="nav-page-title sidebar-trans">
        <span>{page.title}</span>
      </div>
      <NavItemList items={page.items} active={page.active} />
    </div>
  );
}

function NavItemList(props) {
  const items = props.items;
  let listStyle = { maxHeight: props.active ? _.size(items) * 40 : 0 };
  return (
    <ul className="sidebar-trans" style={listStyle}>
      {_.map(items, item => <NavItem item={item} />)}
    </ul>
  );
}

function NavItem(props) {
  const item = props.item;
  return (
    <li>
      <a href={item.uri}>{item.label}</a>
    </li>
  );
}

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: navData,
      activePage: "",
      activeMaxHeight: 80
    };
  }

  render() {
    return (
      <div className="sidebar">
        <div className="toggle">
          <a href="">| | |</a>
        </div>
        {_.map(this.state.pages, page => <NavPage page={page} />)}
      </div>
    );
  }
}

export default Sidebar;
