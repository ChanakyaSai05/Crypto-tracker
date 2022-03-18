import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
  },
  title: {
    textDecoration: "none",
  },
}));
function Navbar() {
  const { currency, setCurrency } = CryptoState();
  const classes = useStyles();
  return (
    <div className={classes.navbar}>
      <Link to="/" className={classes.title}>
        Crypto Tracker
      </Link>
      <div>
        <select onChange={(e) => setCurrency(e.target.value)} value={currency}>
          <option value={"USD"}>USD</option>
          <option value={"INR"}>INR</option>
        </select>
      </div>
    </div>
  );
}

export default Navbar;
