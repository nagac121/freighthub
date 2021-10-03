import React, { Component } from "react";
import AppContext from "../AppContext";

export default class Pagination extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {context => {
          return (
            <div className="Pagination">
              <button
                disabled={context.state.currentPage <= 1}
                onClick={() => context.state.setCurrentPage("prev")}
                className={
                  context.state.currentPage <= 1 ? "Disabled" : "Enabled"
                }
              >
                Previous
              </button>
              <p className="CurrentPage">{context.state.currentPage}</p>
              <button
                disabled={
                  context.state.shipmentsData.length !== context.state.pageLimit
                }
                onClick={() => context.state.setCurrentPage("next")}
                className={
                  context.state.shipmentsData.length !== context.state.pageLimit
                    ? "Disabled"
                    : "Enabled"
                }
              >
                next
              </button>
            </div>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
