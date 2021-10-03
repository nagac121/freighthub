import React, { useContext } from "react";
import AppContext from "../AppContext";

function SortOptions(props) {
  const context = useContext(AppContext);
  return (
    <div
      className={context.state.searching ? "HideSortOptions" : "SortOptions"}
    >
      <div className="SortType">
        <p>Sort Item: </p>
        <input
          type="radio"
          id="name"
          name="sorttype"
          value="name"
          onClick={props.handleSortType}
        />
        <label htmlFor="name">Name</label>
        <input
          type="radio"
          id="id"
          name="sorttype"
          value="id"
          onClick={props.handleSortType}
        />
        <label htmlFor="id">ID</label>
      </div>

      <div className="SortType">
        <p>Sort Order: </p>
        <input
          type="radio"
          id="asc"
          name="sortorder"
          value="asc"
          onClick={props.handleSortOrder}
          disabled={!context.state.sortType}
        />
        <label htmlFor="asc">Asc</label>
        <input
          type="radio"
          id="desc"
          name="sortorder"
          value="desc"
          onClick={props.handleSortOrder}
          disabled={!context.state.sortType}
        />
        <label htmlFor="desc">Desc</label>
      </div>
    </div>
  );
}
export default SortOptions;
