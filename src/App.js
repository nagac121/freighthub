import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";
import AppContext from "./AppContext";

import Pagination from "./components/Pagination";
import Search from "./components/Search";
import ShipmentList from "./components/ShipmentList";
import ShipmentDetail from "./components/ShipmentDetail";
import SortOptions from "./components/SortOptions";

export default class App extends Component {
  isPageChange = false;

  sortEvents = {
    handleSortType: this.handleSortType,
    handleSortOrder: this.handleSortOrder,
  };
  searchEvents = {
    handleChange: this.handleChange,
    handleSearchSubmit: this.handleSearchSubmit,
  };
  constructor(props) {
    super(props);
    this.state = {
      shipmentsData: [],
      pageLimit: 20,
      currentPage: 1,
      setCurrentPage: this.setCurrentPage,
      searchInput: "",
      sortType: "",
      sortOrder: "",
      searching: false,
    };
    this.sortEvents.handleSortType = this.sortEvents.handleSortType.bind(this);
    this.sortEvents.handleSortOrder =
      this.sortEvents.handleSortOrder.bind(this);
    this.searchEvents.handleChange = this.searchEvents.handleChange.bind(this);
    this.searchEvents.handleSearchSubmit =
      this.searchEvents.handleSearchSubmit.bind(this);
  }
  // Hooks
  componentDidMount() {
    this.getShipmentList();
  }

  //  API calls
  getSearchResults() {
    fetch(
      `http://localhost:4000/shipments?q=${this.state.searchInput}&_page=${this.state.currentPage}&_limit=${this.state.pageLimit}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          shipmentsData: res,
        });
      })
      .catch(function (err) {
        console.log("getSearchResults Fetch Error:", err);
      });
  }
  getShipmentList() {
    this.isPageChange = false;
    // let url = `http://localhost:4000/shipments?_page=1&_limit=5&&_sort=name&_order=desc`;
    let url = `http://localhost:4000/shipments?_page=${this.state.currentPage}&_limit=${this.state.pageLimit}`;
    if (!!this.state.sortType) {
      url = url + `&_sort=${this.state.sortType}`;
    }
    if (!!this.state.sortOrder) {
      url = url + `&_order=${this.state.sortOrder}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          shipmentsData: res,
        });
      })
      .catch(function (err) {
        console.log("getShipmentList Fetch Error:", err);
      });
  }

  // Event handlers
  handleSortType(e) {
    let sortType = e.target.value === "name" ? "name" : "id";
    this.setState({ sortType });
    setTimeout(() => {
      this.getShipmentList();
    }, 0);
  }
  handleSortOrder(e) {
    let sortOrder = e.target.value === "asc" ? "asc" : "desc";
    this.setState(() => {
      return { sortOrder };
    });
    setTimeout(() => {
      this.getShipmentList();
    }, 0);
  }
  handleChange(e) {
    this.setState({
      searchInput: e.target.value,
    });
  }
  handleSearchSubmit(e) {
    e.preventDefault();
    if (!!this.state.searchInput) {
      this.setState({
        searching: true,
      });
      this.getSearchResults();
    } else {
      this.setState({
        searching: false,
      });
      this.getShipmentList();
    }
  }
  setCurrentPage = (pageType) => {
    this.isPageChange = true;
    let cp = null;
    if (pageType === "next") {
      cp = this.state.currentPage + 1;
    } else {
      cp = this.state.currentPage - 1;
    }
    this.setState(() => {
      return { currentPage: cp };
    });
    setTimeout(() => {
      if (this.state.searching) {
        this.getSearchResults();
      } else {
        this.getShipmentList();
      }
    }, 0);
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="List">
            <Switch>
              <Route path="/detail/:id" component={ShipmentDetail} />
              <AppContext.Provider value={{ state: this.state }}>
                <Search {...this.searchEvents} />
                <SortOptions {...this.sortEvents} />
                <div className="ItemList">
                  <Route exact={true} path="/" component={ShipmentList} />
                </div>
                <Pagination />
              </AppContext.Provider>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
