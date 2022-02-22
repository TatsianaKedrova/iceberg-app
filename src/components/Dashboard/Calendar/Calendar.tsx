import { Box, Stack, useTheme } from "@mui/material";
import React, { MouseEvent, useMemo, useState } from "react";
import { dashboardStyles } from "../dashboard.styles";
import { ReactComponent as CalendarIcon } from "../../assets/dashboardIcons/calendar.svg";
import DashboardGraphicsContainer from "../DashboardGraphicsContainer/DashboardGraphicsContainer";

const Calendar = () => {
  //variables
  const yesterdayDate = useMemo(() => {
    const date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    let year = new Intl.DateTimeFormat("en", { year: "2-digit" }).format(date);
    let month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
    let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
    let currentMonth = new Intl.DateTimeFormat("en", { month: "short" }).format(
      new Date()
    );
    let currentYear = new Intl.DateTimeFormat("en", { year: "2-digit" }).format(
      new Date()
    );

    if (month !== currentMonth) {
      return `1 ${currentMonth} ${currentYear}`;
    }
    return `${day} ${month} ${year}`;
  }, [new Date()]);

  console.log("date format: ", new Date(yesterdayDate));

  const periodFromInitial = useMemo(() => {
    const firstMonthDay = new Date();
    let year = new Intl.DateTimeFormat("en", { year: "2-digit" }).format(
      firstMonthDay
    );
    let month = new Intl.DateTimeFormat("en", { month: "short" }).format(
      firstMonthDay
    );
    return `1 ${month} ${year}`;
  }, [new Date()]);

  //useState
  const [periodFrom, setPeriodFrom] = useState(periodFromInitial);
  const [periodTo, setPeriodTo] = useState(yesterdayDate);
  const [isSVGClicked, setIsSVGClicked] = useState(false);
  const theme = useTheme();

  const handleCalendarClick = (event: MouseEvent<HTMLOrSVGElement>) => {
    setIsSVGClicked(!isSVGClicked);
  };

  return (
    <>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{
          m: "20px 0px",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Box sx={[dashboardStyles.lastExecutionDate, { fontSize: "16px" }]}>
          Select date range:{" "}
        </Box>
        <Box
          sx={[
            dashboardStyles.lastExecutionDate,
            {
              fontWeight: 700,
              color: theme.palette.secondary.main,
              fontSize: "16px",
            },
          ]}
        >
          {periodFrom} - {periodTo}
        </Box>
        <CalendarIcon
          className="calendarIcon"
          width="20px"
          height="20px"
          onClick={handleCalendarClick}
          style={{
            color: isSVGClicked
              ? theme.palette.primary.main
              : theme.palette.secondary.light,
          }}
        />
      </Stack>
      <DashboardGraphicsContainer periodFrom={new Date('1 1 2022')} periodTo={new Date('1 20 2022')} />
    </>
  );
};

export default Calendar;
