import React from "react";

import ReactFC from "react-fusioncharts";

import FusionCharts from "fusioncharts";

import Chart from "fusioncharts/fusioncharts.charts";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ExampleChart = ({ data }) => {
  const chartConfigs = {
    type: "pie3d",
    width: "100%", 
    height: "400", 
    dataFormat: "json", 
    dataSource: {
      chart: {
        caption: "Languages",
        theme: "candy",
        decimals: 2,
        pieRadius: "50%",
        paletteColors: "#C9AB89, #efe6dc, #504437,#000000,#f4eee7",
      },
      data: data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default ExampleChart;
