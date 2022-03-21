import axios from "axios";
import { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";
import { createTheme, makeStyles, ThemeProvider } from "@material-ui/core";

import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";

const Coingraph = ({ coin, hii }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  console.log(coin);

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

  const fetchHistoricData = async () => {
    try {
      const { data } = await axios.get(
        // HistoricalChart(coin.id, days, currency)
        `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      console.log(data.prices);

      setHistoricData(data.prices);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return hii;
  // <ThemeProvider theme={darkTheme}>
  //   <div className={classes.container}>
  //     <>
  //       <Line
  //         data={{
  //           labels: historicData.map((coin) => {
  //             let date = new Date(coin[0]);
  //             let time =
  //               date.getHours() > 12
  //                 ? `${date.getHours() - 12}:${date.getMinutes()} PM`
  //                 : `${date.getHours()}:${date.getMinutes()} AM`;
  //             return days === 1 ? time : date.toLocaleDateString();
  //           }),

  //           datasets: [
  //             {
  //               data: historicData.map((coin) => coin[1]),
  //               label: `Price ( Past ${days} Days ) in ${currency}`,
  //               borderColor: "#EEBC1D",
  //             },
  //           ],
  //         }}
  //         options={{
  //           elements: {
  //             point: {
  //               radius: 1,
  //             },
  //           },
  //         }}
  //       />
  //       <div
  //         style={{
  //           display: "flex",
  //           marginTop: 20,
  //           justifyContent: "space-around",
  //           width: "100%",
  //         }}
  //       >
  //         {chartDays.map((day) => (
  //           <button
  //             key={day.value}
  //             onClick={() => {
  //               setDays(day.value);
  //             }}
  //             selected={day.value === days}
  //           >
  //             {day.label}
  //           </button>
  //         ))}
  //       </div>
  //       <h1>hii</h1>
  //     </>
  //   </div>
  // </ThemeProvider>
};

export default Coingraph;
