import React from "react";

// set defaults
const AppContext = React.createContext({
  currentPage: 1,
  shipmentsData: [],
  setCurrentPage: () => {},
  searchInput:""
});

export default AppContext;
