import React, { useEffect, useState } from "react";
import { LinearProgress, makeStyles } from "@material-ui/core";
import axios from "axios";
import { CoinList } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { useNavigate } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import "./CoinsTable.css";

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export default function CoinsTable() {
  const { currency, symbol } = CryptoState();
  const [coins, setCoins] = useState([]);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
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

  const filteredText = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(text) ||
      coin.symbol.toLowerCase().includes(text)
  );
  return (
    <div className="table-container">
      <div className="table-heading">CryptoCurrency Prices by Market Cap</div>
      <input
        className="input-field"
        type="text"
        placeholder="Search for a Crypto Currency..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {!coins ? (
        <LinearProgress style={{ backgroundColor: "gold" }} />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>Market Cap</th>
            </tr>
          </thead>

          {filteredText
            .slice((page - 1) * 10, (page - 1) * 10 + 10)
            .map((row, index) => {
              const profit = row.price_change_percentage_24h > 0;
              return (
                <>
                  <tbody style={{ cursor: "pointer" }}>
                    <tr
                      onClick={() => navigate(`/coins/${row.id}`)}
                      key={index}
                    >
                      <td>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img src={row?.image} alt={row.name} height="55" />
                          <div style={{ marginLeft: "4px" }}>
                            <div style={{ fontWeight: "bold" }}>
                              {row?.symbol.toUpperCase()}
                            </div>
                            <div>{row?.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {symbol}{" "}
                        <span>
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </span>
                      </td>
                      <td style={{ color: profit > 0 ? "green" : "red" }}>
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </td>
                      <td>
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, 7)
                        )}
                        M
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })}
        </table>
      )}

      <Pagination
        count={(filteredText?.length / 10)?.toFixed(0)}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
        }}
        onChange={(_, value) => {
          setPage(value);
          // window.scroll(0, 450);
        }}
        variant="outlined"
        color="primary"
      />
    </div>
  );
}
