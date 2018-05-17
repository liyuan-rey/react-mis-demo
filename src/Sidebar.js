import React, { Component } from "react";
import "./Sidebar.css";
import _ from "lodash";

const navData = [
  {
    key: _.uniqueId(),
    title: "警情管理",
    items: [
      { key: _.uniqueId(), label: "当前警情", uri: "" },
      { key: _.uniqueId(), label: "历史警情", uri: "" }
    ]
  },
  {
    key: _.uniqueId(),
    title: "资源管理",
    items: [
      { key: _.uniqueId(), label: "资源人", uri: "" },
      { key: _.uniqueId(), label: "资源车", uri: "" },
      { key: _.uniqueId(), label: "资源物资", uri: "" }
    ]
  }
];

function NavPage(props) {
  function togglePage(e) {
    e.preventDefault();

    let to = !props.active;

    if (_.isFunction(props.onPageActive))
      props.onPageActive(to ? props.page.key : "");
  }

  return (
    <div
      className={["nav-page", props.active ? "nav-page-active" : ""].join(" ")}
      onClick={togglePage}
    >
      <div className="nav-page-title sidebar-trans">
        <span>{props.page.title}</span>
      </div>
      <NavItemList items={props.page.items} active={props.active} />
    </div>
  );
}

class NavItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItemId: ""
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, id) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      currentItemId: id
    });
  }

  render() {
    let items = this.props.items;
    let listStyle = {
      maxHeight: (this.props.active ? items.length * 40 : 0) + "px"
    };

    return (
      <ul className="sidebar-trans" style={listStyle}>
        {items.map(item => (
          <li
            key={item.key}
            className={
              this.props.active && this.state.currentItemId === item.key
                ? "active"
                : ""
            }
          >
            <a href={item.uri} onClick={e => this.handleClick(e, item.key)}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.data = navData;
    this.state = {
      activePageId: this.data[0].key
    };

    this.handlePageActive = this.handlePageActive.bind(this);
  }

  handlePageActive(pageId) {
    this.setState(prevState => ({ activePageId: pageId }));
  }

  render() {
    return (
      <div className="sidebar">
        <div className="toggle">
          <a href="">| | |</a>
        </div>
        {this.data.map(page => (
          <NavPage
            key={page.key}
            page={page}
            active={page.key === this.state.activePageId}
            onPageActive={this.handlePageActive}
          />
        ))}
      </div>
    );
  }
}

export default Sidebar;
