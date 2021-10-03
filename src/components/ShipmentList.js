import React, { Component } from "react";
import { Link } from "react-router-dom";

import AppContext from "../AppContext";

export default class ShipmentList extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {context => {
          return context.state.shipmentsData.map((item,index) => {
            return (
              <Link key={item.id} to={`/detail/${item.id}`}>
                <p className="ListItem">{item.id}</p>
              </Link>
            );
          });
        }}
      </AppContext.Consumer>
    );
  }
}
