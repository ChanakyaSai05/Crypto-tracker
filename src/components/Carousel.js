import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "./CoinsTable/CoinsTable";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
function Carousel() {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    console.log(data);
    setTrending(data);
  };
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);
  const banner = {
    backgroundImage: "url(./banner2.jpg)",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "43vh",
  };
  const aliceHeading = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    margin: "40px",
  };
  const carousel = {
    display: "flex",
    alignItems: "center",
    width: "77vw",
  };
  const carouselItem = {
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    justifyContent: "center",
    alignItems: "center",
  };
  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coins/${coin.id}`} style={carouselItem}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: "10px" }}
        />
        <div>
          <span style={{ color: "white" }}>{coin?.symbol.toUpperCase()}</span>

          <span
            style={{ color: profit > 0 ? "green" : "red", marginLeft: "4px" }}
          >
            {profit && "+"}
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </div>

        <div
          style={{
            color: "white",
            fontSize: "large",
          }}
        >
          {symbol}
          {numberWithCommas(coin?.current_price.toFixed(2))}
        </div>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <div style={banner}>
      <div style={aliceHeading}>
        <div
          style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "4px" }}
        >
          Crypto Tracker
        </div>
        <div>Get all the Info Regarding your Favorite Crypto Currency </div>
      </div>
      <div style={carousel}>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          items={items}
          autoPlay
        />
      </div>
    </div>
  );
}

export default Carousel;
