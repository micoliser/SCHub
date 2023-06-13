import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

function Home() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <h1>SCHub</h1>
      {!isLoggedIn && <Link to="/login">Login</Link>}
    </>
  );
}

export default Home;
