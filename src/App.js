import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import ReactWordcloud from "react-wordcloud";
import { scraperService } from "./service/service";

const theme = createTheme();

export default function App() {
  const [districts, setDistricts] = useState([]);
  const [districtsByPrice, setDistrictsByPrice] = useState([]);

  useEffect(() => {
    scraperService.getMostPopularDistricts().then((response) => {
      console.log(response.data);
      setDistricts(response.data);
    });
  }, []);

  useEffect(() => {
    scraperService.getDistrictByPrice().then((response) => {
      setDistrictsByPrice(response.data);
    });
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const wordcloudOptions = {
    fontSizes: [20, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const getLabels = () => {
    let labels = [];
    console.log(districtsByPrice);
    districtsByPrice.forEach((element) => {
      labels.push(element.text);
    });
    console.log(labels);
    return labels;
  };

  const getData = (labels) => {
    let data = [];
    labels.forEach((label) => {
      data.push(districtsByPrice.filter((obj) => {
        return obj.text === label;
      })[0]["value"])
    });
    return data;
  };

  const labels = getLabels();

  const data = {
    labels,
    datasets: [
      {
        label: "Średnia cena za metr",
        data: getData(labels),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Otodom Scrapper
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Container maxWidth="sm">
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Line options={options} data={data} />
            <ReactWordcloud options={wordcloudOptions} words={districts} />
          </Stack>
        </Container>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}></Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
