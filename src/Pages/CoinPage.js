import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinInfo from "../components/CoinInfo";

// import { numberWithCommas } from "../components/CoinsTable";
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
  }, []);
  return (
    <div className="container">
      <div className="left-side-page">
        <img src={coin?.image.large} />
        <div>{coin?.name}</div>
        <div>{coin?.description.en.split(". ")[0]}.</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>Rank</h2>
          <div>{coin?.market_cap_rank}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>Current Price:</h2>
          <div>
            {symbol} {coin?.market_data.current_price[currency.toLowerCase()]}
          </div>
        </div>
      </div>
      <div className="right-side-page">
        <CoinInfo coin={coin}></CoinInfo>
      </div>
    </div>
  );
}

export default CoinPage;
