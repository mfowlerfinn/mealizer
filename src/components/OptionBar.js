// import 'date-fns';
import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

export default function OptionBar({ shuffle }) {

  const today = new Date();
  const endDay = new Date();
  
  endDay.setDate(today.getDate() + 7);
  const [startDate, setStartDate] = React.useState(today);
  const [endDate, setEndDate] = React.useState(endDay);

  const handleStartDateChange = date => {
    setStartDate(date);
  };
  const handleEndDateChange = date => {
    setEndDate(date);
  };

  useEffect(() => {
    console.log({ startDate, endDate });
  }, [startDate, endDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Start"
          format="MM/dd/yyyy"
          value={startDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="End"
          format="MM/dd/yyyy"
          value={endDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <Button onClick={shuffle}>Shuffle All</Button>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
