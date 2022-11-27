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
        align: "high",
      },
    },
    yAxis: {
      title: {
        text: "人口数",
        align: "high",
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    plotOptions: {
      series: {
        pointInterval: 5,
        pointStart: 1980,
      },
    },
    series: series,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
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
