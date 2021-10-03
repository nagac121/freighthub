import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Link to={"/"}>
      <button className="HomeButton">Home</button>
    </Link>
  );
};
export default Home;
