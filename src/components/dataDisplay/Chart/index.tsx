import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { PopulationProviderProps } from "@/components/dataProvider/PopulationProvider";

type ChartProps = {
  title: string;
  dataProvider: PopulationProviderProps;
};

function Chart({ title, dataProvider }: ChartProps) {
  const { series, isLoading, error } = dataProvider;

  const options = {
    title: {
      text: title,
    },
    xAxis: {
      title: {
        text: "年度",
      },
    },
    yAxis: {
      title: {
        text: "人口数",
      },
    },
    plotOptions: {
      series: {
        pointInterval: 5,
        pointStart: 1980,
      },
    },
    series: series,
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </>
  );
}

export default Chart;
