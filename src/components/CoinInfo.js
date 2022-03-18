import axios from "axios";
import { HistoricalChart } from "../config/api";
import { line } from "react-chartjs-2";
import { chartDays } from "../config/data";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";

function CoinInfo({ coin }) {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  };
  useEffect(() => {
    fetchHistoricData();
  }, [days]);
  return <div>CoinInfo</div>;
}

export default CoinInfo;
