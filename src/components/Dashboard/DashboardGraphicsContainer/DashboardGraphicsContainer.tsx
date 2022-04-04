import { Box, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { cloudAccountsService } from "../../../services";
import Chart from "react-google-charts";
import { GoogleViz } from "react-google-charts/dist/types";
import isObject from "lodash-es/isObject";
import { ChartsUtils } from "../utils/chart-utils";
import { DashboardCostAndUsageTrendPeriodicRow } from "../../../dtos/clientsDTO/clients.dto";
import { DateTimeUtils } from "../utils/date-time.utils";
import max from "lodash-es/max";

export interface ICalendarDateTimeRange {
  periodFrom: Date;
  periodTo: Date;
}

const DashboardGraphicsContainer: React.FC<ICalendarDateTimeRange> = observer(({periodFrom, periodTo}) => {
  //variables
  const columnColor = "#5FC4D7";
  const showUsage = false;
  let maxCostValue: number;
  const chartHeight = 385;
  let chartDataRaw: DashboardCostAndUsageTrendPeriodicRow[] | null;

  //useState
  const [isWithUsage, setIsWitUsage] = useState(true);
  const [isWithForecast, setIsWithForecast] = useState(false);

  //react-query
  const getCostUsageTrends = async () => {
    const response = await cloudAccountsService.getCostAndUsageTrends(
      DateTimeUtils.SetUtcTimezone(periodFrom),
      DateTimeUtils.SetUtcTimezone(transformedDateTo),
      isWithUsage,
      isWithForecast
    );
    return response;
  };

  const getCostAndUsageTrends = useQuery(
    "getCostAndUsageTrends",
    getCostUsageTrends
  );

  const checkIsForcastAvailable = async (periodFrom: Date, periodTo: Date) => {
    const response = await cloudAccountsService.getIsForcastingAvailable(
      periodFrom,
      periodTo
    );
    return response;
  };

  const getIsForcastingAvailable = useQuery(
    ["getIsForcastingAvailable", periodFrom, periodTo],
    () => checkIsForcastAvailable(periodFrom, periodTo)
  );

  const chartData = getCostAndUsageTrends?.data?.data.data;
  const isForecastAvailable = getIsForcastingAvailable.data?.data.data;

  const showForecast = false;
  // useMemo((): boolean => {
  //   return isWithForecast && isForecastAvailable!;
  // }, [isWithForecast, isForecastAvailable]);



  const { columns, colors } = useMemo(() => {
    const tempColumns: any[] = [
        "Month",
      "Total spend",
      { type: "string", role: "tooltip", p: { html: true } }
    ];
    let tempColors = [columnColor];

    if (showForecast) {
      tempColumns.push("Forecast");
      tempColumns.push({ type: "string", role: "tooltip", p: { html: true } });
      tempColors.push("#84BC03");
    }

    if (showUsage) {
      tempColumns.push("Usage");
      tempColumns.push({ type: "string", role: "tooltip", p: { html: true } });
      tempColors.push("#FB6E0E");
    }

    return {columns: tempColumns, colors: tempColors};
  }, [columnColor, showForecast, showUsage]);



  const series = showUsage
    ? {
        [columns.filter((x) => !isObject(x)).findIndex((x) => x === "Usage") -
        1]: { type: "line", pointShape: "circle", targetAxisIndex: 1 },
      }
    : undefined;

  const chartOptions = {
    height: chartHeight,
    animation: {
      duration: 300,
      easing: "inAndOut",
      startup: true,
    },
    colors,
    theme: "material",
    legend: {
      position: "top",
      maxLines: 3,
      alignment: "start",
      textStyle: { fontSize: 16 },
    },
    bar: { groupWidth: "56%" },
    isStacked: true,
    seriesType: "bars",
    series,
    pointShape: "circle",
    pointSize: 8,
    axisTitlesPosition: "out",
    vAxes: {
      0: {
        title: "Cost, $",
        // ticks: ChartsUtils.CalculateChartTicksToFitLinesCount(5, maxCostValue),
      },
      1: {
        title: "Usage, %",
        ticks: ChartsUtils.CalculateChartTicksToFitLinesCount(5, 95),
      },
    },
    vAxis: {
      titleTextStyle: {
        fontSize: 12,
        color: "#86898B",
        italic: false,
      },
      minorGridlines: {
        count: 0,
      },
      textStyle: {
        fontSize: 12,
        color: "#86898B",
        italic: false,
      },
      gridlines: {
        color: "#DBDCE0",
      },
    },
    hAxis: {
      title: "Month",
      titleTextStyle: {
        fontSize: 12,
        color: "#86898B",
        italic: false,
      },
      textStyle: {
        fontSize: 12,
        color: "#86898B",
        italic: false,
      },
      minorGridlines: {
        count: 0,
      },
      gridlines: {
        color: "transparent",
      },
      baselineColor: "#333333",
    },
    tooltip: {
      isHtml: true,
    },
    chartArea: {
      left: 80,
      top: 10,
      right: 80,
      bottom: 60,
      width: "100%",
      height: "100%",
    },
  };
  const transformedDateTo = new Date(
    periodTo.getFullYear(),
    periodTo.getMonth(),
    periodTo.getDate()
  );

  const newData: any[] | undefined = chartData?.map((item) => {
    const cost = (Math.round(item.totalSpend * 100) / 100).toFixed(2);
    let usage;
    if (item.usage !== null) {
      usage = (Math.round(item.usage * 100) / 100).toFixed(2);
      return [
          item.periodName,
        cost,
        `<p><b>${item.periodName}</b></p> <p>Total spend: <b>${cost}</b></p>`
      ];
    } else {
      return [
        item.periodName,
        cost,
        `<p><b>${item.periodName}</b></p> <p>Total spend: <b>${cost}</b></p>`
      ];
    }
  });

  const chartDataToDisplay = chartData?.map((item) => {
    const cost = (Math.round(item.totalSpend * 100) / 100).toFixed(2);
    return [
      item.periodName,
      cost,
      `<p><b>${item.periodName}</b></p> <p>Total spend: <b>${cost}</b></p>`,
    ];
  });

  console.log('chartData', chartData);
  console.log('chartDataToDisplay', chartDataToDisplay);

  const updateData = async (): Promise<void> => {
    try {
      if (!periodFrom || !periodTo) {
        return;
      }

      const transformedDateTo = new Date(
        periodTo.getFullYear(),
        periodTo.getMonth(),
        periodTo.getDate()
      );
      const newTransformedDate = transformedDateTo.setDate(
        transformedDateTo.getDate() + 1
      );
      console.log("newTransformedDate: ", newTransformedDate);

      const chartDataToDisplay = chartData?.map((item) => {
        const cost = (Math.round(item.totalSpend * 100) / 100).toFixed(2);
        return [
          item.periodName,
          cost,
          `<p><b>${item.periodName}</b></p> <p>Total spend: <b>${cost}</b></p>`,
        ];
      });

      maxCostValue =
        max(
          chartDataRaw?.map((item) =>
            item.totalSpend >= item.forecast ? item.totalSpend : item.forecast
          )
        ) || 10;

      if (showForecast) {
        chartDataToDisplay?.forEach((v, i) => {
          if (chartDataRaw) {
            const usageAndForecastDiff =
              chartDataRaw && chartDataRaw[i].forecast > 0
                ? chartDataRaw[i].forecast - chartDataRaw[i].totalSpend
                : 0;

            v.push(parseFloat(usageAndForecastDiff.toString()).toFixed(2));
            v.push(`
                  <p><b>${chartDataRaw[i].periodName}</b></p> <p>Forecast: <b>${chartDataRaw[i].forecast}</b></p>`);
          }
        });
      }

      if (showUsage) {
        chartDataToDisplay?.forEach((v, i) => {
          if (chartData) {
            v.push(parseFloat(chartData[i].usage!.toString()).toFixed(2));
            v.push(
              `<p><b>${
                chartData[i].periodName
              }</b></p> <p>Usage: <b>${parseFloat(
                chartData[i].usage!.toFixed(2)
              )}</b></p>`
            );
          }
        });
      }
      //   updateChartSettings();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  console.log("update function: ", updateData());

  const data2 = [
    ["Month", "Total spend"],
    ["2014", 1000],
    ["2015", 1170],
    ["2016", 660],
    ["2017", 1030],
    ["2014", 1000],
    ["2015", 1170],
    ["2016", 660],
    ["2017", 1030],
    ["2014", 1000],
    ["2015", 1170],
    ["2016", 660],
    ["2017", 1030],
    ["2014", 1000],
    ["2015", 1170],
    ["2016", 660],
    ["2017", 1030],
  ];

  return (
    <Chart
      chartType="Bar"
      columns={columns}
      width="100%"
      height="385px"
      data={chartDataToDisplay}
      options={chartOptions}
    />

  );
});

export default DashboardGraphicsContainer;

 // <Chart
    //   className="usageTrendsChart"
    //   width={"997px"}
    //   chartType="Bar"
    //   loader={<div>Loading Chart</div>}
    //   data={dashboardData}
    //   options={}
    //   //       {
    //   //     vAxis: { title: "Cost, $", minValue: 0, maxValue: 200 },
    //   //     hAxis: { title: "Month" },
    //   //     // seriesType: "bars",
    //   //     // series: { 0: { type: "line" } },
    //   //     colors: ["#5FC4D7"],
    //   //   }
    //   rootProps={{ "data-testid": "1" }}
    // />

// const updateChartSettings = () => {
//     const columns: any[] = ["Month", "Total spend"];
//     columns.push({ type: "string", role: "tooltip", p: { html: true } });
//     const colors = [columnColor];

//     if (showForecast) {
//       columns.push("Forecast");
//       columns.push({ type: "string", role: "tooltip", p: { html: true } });
//       colors.push("#84BC03");
//     }

//     if (showUsage) {
//       columns.push("Usage");
//       columns.push({ type: "string", role: "tooltip", p: { html: true } });
//       colors.push("#FB6E0E");
//     }

//     console.log("columns: ", columns);
//     console.log(
//       "something: ",
//       columns.filter((x) => !isObject(x)).findIndex((x) => x === "Usage") - 1
//     );

//     const series = showUsage
//       ? {
//           [columns.filter((x) => !isObject(x)).findIndex((x) => x === "Usage") -
//           1]: { type: "line", pointShape: "circle", targetAxisIndex: 1 },
//         }
//       : undefined;
//     console.log("series: ", series);

//     const chartOptions = {
//       height: chartHeight,
//       animation: {
//         duration: 300,
//         easing: "inAndOut",
//         startup: true,
//       },
//       colors,
//       theme: "material",
//       legend: {
//         position: "top",
//         maxLines: 3,
//         alignment: "start",
//         textStyle: { fontSize: 16 },
//       },
//       bar: { groupWidth: "56%" },
//       isStacked: true,
//       seriesType: "bars",
//       series,
//       pointShape: "circle",
//       pointSize: 8,
//       axisTitlesPosition: "out",
//       vAxes: {
//         0: {
//           title: "Cost, $",
//           ticks: ChartsUtils.CalculateChartTicksToFitLinesCount(
//             5,
//             maxCostValue
//           ),
//         },
//         1: {
//           title: "Usage, %",
//           ticks: ChartsUtils.CalculateChartTicksToFitLinesCount(5, 95),
//         },
//       },
//       vAxis: {
//         titleTextStyle: {
//           fontSize: 12,
//           color: "#86898B",
//           italic: false,
//         },
//         minorGridlines: {
//           count: 0,
//         },
//         textStyle: {
//           fontSize: 12,
//           color: "#86898B",
//           italic: false,
//         },
//         gridlines: {
//           color: "#DBDCE0",
//         },
//       },
//       hAxis: {
//         title: "Month",
//         titleTextStyle: {
//           fontSize: 12,
//           color: "#86898B",
//           italic: false,
//         },
//         textStyle: {
//           fontSize: 12,
//           color: "#86898B",
//           italic: false,
//         },
//         minorGridlines: {
//           count: 0,
//         },
//         gridlines: {
//           color: "transparent",
//         },
//         baselineColor: "#333333",
//       },
//       tooltip: {
//         isHtml: true,
//       },
//       chartArea: {
//         left: 80,
//         top: 10,
//         right: 80,
//         bottom: 60,
//         width: "100%",
//         height: "100%",
//       },
//     };
//     return;
//   };
