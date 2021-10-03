import React from "react";

import AppContext from "../AppContext";

function Search(props) {
  return (
    <AppContext.Consumer>
      {(context) => {
        return (
          <div>
            <h2>SHIPMENT LIST</h2>
            <form onSubmit={props.handleSearchSubmit} className="Search">
              <input
                type="text"
                name="searchbox"
                className="searchbox"
                placeholder="Type ID or Text eg. S1000, Summer2018"
                onChange={props.handleChange}
              />
              <button value={context.state.searchInput}>Search</button>
            </form>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}
export default Search;
