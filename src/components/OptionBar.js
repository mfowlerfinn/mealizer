import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { startOfToday, addDays, differenceInDays } from "date-fns";
import { useGlobalState } from "../context/LocalState";
import TextInput from "./TextInput";

export default function OptionBar({ shuffle }) {
  const {
    options,
    setOptions,
    menuObject,
    setMenuObject
  } = useGlobalState();

  let weekLength = 7;

  const today = new Date(startOfToday());
  const endDay = new Date(addDays(startOfToday(), weekLength - 1));

  const [startDate, setStartDate] = React.useState(today);
  const [endDate, setEndDate] = React.useState(endDay);
  const [days, setDays] = React.useState(weekLength);
  const [servings, setServings] = React.useState(2);

  const handleStartDateChange = date => {
    setStartDate(date);
  };
  const handleEndDateChange = date => {
    setEndDate(date);
  };

  useEffect(() => {
    const dateDifference = differenceInDays(endDate, startDate) + 1;
    setDays(dateDifference);
  }, [startDate, endDate]);

  useEffect(() => {
    setOptions({ days: days, startDate: startDate });
  }, [days]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <Button onClick={shuffle}>Plan {days} days!</Button>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          //label="Start"
          format="eeee, MMM do"
          value={startDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          //label="End"
          format="eeee, MMM do"
          value={endDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <TextInput />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
