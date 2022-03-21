import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1vw",
    backgroundColor: "#14161a",
  },
  title: {
    textDecoration: "none",
    color: "gold",
    fontWeight: "bold",
    fontSize: "25px",
    marginLeft: "9.7vw",
  },
  select: {
    padding: "8px 14px",
    backgroundColor: "#14161a",
    color: "gold",
    marginRight: "8vw",
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
        <select
          onChange={(e) => setCurrency(e.target.value)}
          value={currency}
          className={classes.select}
        >
          <option value={"USD"}>USD</option>
          <option value={"INR"}>INR</option>
        </select>
      </div>
    </div>
  );
}

export default Navbar;
