import React, { Component } from "react";

import Home from "./Home";

export default class ShipmentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipmentDetail: {},
      isNameEditable: false
    };
    this.pNameRef = React.createRef();
  }
  fetchShipmentDetail(fetchMethod) {
    let reqObj = {
      method: fetchMethod,
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (fetchMethod === "PUT") {
      reqObj["body"] = JSON.stringify(this.state.shipmentDetail);
    }
    fetch(
      `http://localhost:4000/shipments/${this.props.match.params.id}`,
      reqObj
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          shipmentDetail: res
        });
      })
      .catch(console.log);
  }
  componentDidMount() {
    this.fetchShipmentDetail("GET");
  }
  handleEdit() {
    const nameElement = document.getElementById("name");
    nameElement.contentEditable = "true";
    nameElement.focus();
    this.setState({
      isNameEditable: true
    });
  }

  postUpdate() {
    const nametext = this.pNameRef.current.innerText;
    var shipmentDetail = { ...this.state.shipmentDetail };
    shipmentDetail.name = nametext;
    this.setState(() => {
      return {
        isNameEditable: false,
        shipmentDetail
      };
    });
    setTimeout(() => {
      this.fetchShipmentDetail("PUT");
    }, 0);
  }

  render() {
    return (
      <div>
        <h2>SHIPMENT DETAIL</h2>
        <div className="ShipmentDetail">
          <div>
            <label>ID</label>
            <br />
            <p>{this.state.shipmentDetail.id}</p>
          </div>
          <div>
            <label>NAME</label>
            <br />
            <div>
              <p id="name" ref={this.pNameRef}>
                {this.state.shipmentDetail.name}
              </p>
              <button
                onClick={this.handleEdit.bind(this)}
                className={
                  this.state.isNameEditable ? "HideEdit" : "ShowEdit Edit"
                }
              >
                Edit
              </button>
              <div
                className={this.state.isNameEditable ? "ShowEdit" : "HideEdit"}
              >
                <button onClick={this.postUpdate.bind(this)} className="Update">
                  Update
                </button>
                <button
                  onClick={() => {
                    this.setState({ isNameEditable: false });
                  }}
                  className="Cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div>
            <label>DESTINATION</label>
            <br />
            <p>{this.state.shipmentDetail.destination}</p>
          </div>
        </div>
        <Home />
      </div>
    );
  }
}
