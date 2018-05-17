import React, { Component } from "react";
import "./Incident.css";
import svc from "./sdk/ClientSDK";
import _ from "lodash";
import cmn from "./Common";

class IncidentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incidents: [],
      activeIncidentId: ""
    };
  }

  componentDidMount() {
    if (_.isArray(this.state.incidents) && this.state.incidents.length > 0)
      return;

    this.setState({
      incidents: svc.getIncidentListSimple(),
      activeIncidentId: ""
    });
    this.props.onSelectIncident("");
  }

  handleClick(e, id) {
    e.preventDefault();

    if (this.state.activeIncidentId === id) return;

    this.setState(prevState => ({ ...prevState, activeIncidentId: id }));
    this.props.onSelectIncident(id);
  }

  render() {
    return (
      <ul>
        {this.state.incidents.map(incident => (
          <li key={incident.id} onClick={e => this.handleClick(e, incident.id)}>
            <div className="list-cell">
              <div
                className={[
                  "cell-icon",
                  cmn.getLevelStyle(incident.level)
                ].join(" ")}
              />
              <div className="title">{incident.title}</div>
              <div>{incident.reportTime.toLocaleTimeString()}</div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

function IncidentInfo(props) {
  let info = svc.getIncidentInfo(props.incidentId);
  if (_.isPlainObject(info))
    return (
      <div className="inc-detail box-shadow">
        <div className="title">{info.title}</div>
        <div>{info.reportTime.toLocaleTimeString()}</div>
        <div className={cmn.getLevelStyle(info.level)}>
          {info.level + " - " + cmn.getLevelTitle(info.level)}
        </div>
        <div>{info.description}</div>
      </div>
    );
  else return <div className="inc-detail box-shadow" />;
}

class Incident extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIncidentId: ""
    };

    this.handleSelectIncident = this.handleSelectIncident.bind(this);
  }

  handleSelectIncident(id) {
    this.setState(() => ({
      currentIncidentId: id
    }));
  }

  render() {
    return (
      <div className="inc-mag">
        <div className="inc-mag-left">
          <div className="inc-list box-shadow">
            <div className="title">
              <span>待处理</span>
              <a className="pull-right" href="">
                刷新
              </a>
            </div>
            <div className="content">
              <IncidentList onSelectIncident={this.handleSelectIncident} />
            </div>
          </div>
        </div>
        <div className="inc-mag-right">
          <IncidentInfo incidentId={this.state.currentIncidentId} />
          <div className="inc-relative-content box-shadow">
            <ul className="header">
              <li className="active">
                <a href="">资源调派</a>
              </li>
              <li>
                <a href="">操作日志</a>
              </li>
            </ul>
            <div className="body">
              <div className="page active">
                <p>已调派资源列表</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Incident;
