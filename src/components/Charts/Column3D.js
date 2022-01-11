import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Column3d = ({ data }) => {
  const chartConfigs = {
    type: "column3d", 
    width: "100%",
    height: "400", 
    dataFormat: "json", 
    dataSource: {
      chart: {
        caption: "Projects",
        yAxis: "Stars",
        xAxis: "Repos",
        xAxisNameFontSize: "16px",
        yAxisNameFontSize: "16px",
        theme: "candy",
        paletteColors: "#C9AB89, #efe6dc, #504437,#3c3329,#f4eee7",
      },
      data: data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default Column3d;
