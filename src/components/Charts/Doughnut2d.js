import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Doughtnut2d = ({ data }) => {
  const chartConfigs = {
    type: "doughnut2d", 
    width: "100%", 
    height: "400", 
    dataFormat: "json", 
    dataSource: {
      chart: {
        caption: "Stars Per Language",
        theme: "fusion",
        decimals: 2,
        doughnutRadius: "45%",
        showPercentValues: 0,
        theme: "candy",
        paletteColors: "#C9AB89, #efe6dc, #504437,#3c3329,#f4eee7",
      },
      data: data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default Doughtnut2d;
