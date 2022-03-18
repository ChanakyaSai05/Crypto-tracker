import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export default function CoinsTable() {
  const { currency, symbol } = CryptoState();
  console.log(symbol);
  console.log(currency);
  const [coins, setCoins] = useState([]);
  const navigate = useNavigate();

  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency));
    console.log(data);
    setCoins(data);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  return (
    <table>
      <thead>
        <th>Coin</th>
        <th>Price</th>
        <th>24h Change</th>
        <th>Market Cap</th>
      </thead>

      {coins.map((row) => {
        const profit = row.price_change_percentage_24h > 0;
        return (
          <tbody key={row.name}>
            <tr onClick={() => navigate(`/coins/${row.id}`)}>
              <td>
                <div style={{ display: "flex" }}>
                  <img src={row?.image} alt={row.name} />
                  <div>
                    <div>{row?.symbol.toUpperCase()}</div>
                    <div>{row?.name}</div>
                  </div>
                </div>
              </td>
              <td>
                {symbol}{" "}
                <span>{numberWithCommas(row.current_price.toFixed(2))}</span>
              </td>
              <td style={{ color: profit > 0 ? "green" : "red" }}>
                {profit && "+"}
                {row.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td>
                {symbol}{" "}
                {numberWithCommas(row.market_cap.toString().slice(0, 7))}M
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
}
