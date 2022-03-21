import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import { makeStyles } from "@material-ui/core";
import Coingraph from "../components/Coingraph";

function CoinPage() {
  const { id } = useParams();
  console.log(id);
  const { currency, symbol } = CryptoState();
  const [coin, setCoin] = useState();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  console.log(coin);
  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  // useEffect(
  //   function () {
  //     fetchCoin();
  //   },
  //   [currency]
  // );

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      backgroundColor: "#14161a",
    },
    leftSideDiv: {
      width: "25vw",
      margin: "2vw",
    },
    coinImage: {
      textAlign: "center",
    },
    coinName: {
      fontWeight: "bolder",
      fontSize: "20px",
      textAlign: "center",
      color: "white",
    },
    coinDescription: {
      color: "white",
      margin: "8px 0px",
      fontSize: "17px",
      textAlign: "justify",
      textJustify: "inter-word",
    },
    coinRank: {
      display: "flex",
      alignItems: "center",
      color: "white",
    },
    coinCurrentPrice: {
      display: "flex",

      alignItems: "center",
      color: "white",
    },
    coinMarketCapital: {
      color: "white",
      fontWeight: "bold",
      fontSize: "20px",
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.leftSideDiv}>
        <div className={classes.coinImage}>
          <img
            src={coin?.image.large}
            alt="https://source.unsplash.com/random"
            height="200"
          />
        </div>

        <div className={classes.coinName}>{coin?.name}</div>
        <div className={classes.coinDescription}>
          {coin?.description.en.split(". ")[0]}.
        </div>
        <div className={classes.coinRank}>
          <div
            style={{
              fontWeight: "bolder",
              margin: "4px 0px",
              fontSize: "20px",
            }}
          >
            Rank
          </div>
          <div
            style={{ marginLeft: "2px", fontWeight: "bold", fontSize: "20px" }}
          >
            {coin?.market_cap_rank}
          </div>
        </div>
        <div className={classes.coinCurrentPrice}>
          <div
            style={{
              fontWeight: "bolder",
              margin: "4px 0px",
              fontSize: "20px",
            }}
          >
            Current Price:
          </div>
          <div
            style={{ marginLeft: "2px", fontWeight: "bold", fontSize: "20px" }}
          >
            {symbol} {coin?.market_data.current_price[currency.toLowerCase()]}
          </div>
        </div>
        <div className={classes.coinMarketCapital}>
          {symbol} &nbsp;
          {coin?.market_data.market_cap[currency.toLowerCase()]
            .toString()
            .slice(0, 7)}
          M
        </div>
      </div>
      <div className="right-side-page">
        <Coingraph coin={coin} hii />
      </div>
    </div>
  );
}

export default CoinPage;
