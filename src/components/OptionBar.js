import React, { useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { startOfToday, addDays, differenceInDays } from "date-fns";
import { useGlobalState } from "../context/LocalState";
import { RecipeTypeSelector } from "./RecipeTypeSelector";

export default function OptionBar({ planMeals }) {
  const { setOptions} = useGlobalState();

  let weekLength = 7;

  const today = new Date(startOfToday());
  const endDay = new Date(addDays(startOfToday(), weekLength - 1));

  const [startDate, setStartDate] = React.useState(today);
  const [endDate, setEndDate] = React.useState(endDay);
  const [days, setDays] = React.useState(weekLength);

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
  }, [days, startDate, setOptions]);

  const handleMealType = code => {
    // console.log(code);
    setOptions({ mealType: code });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div id="option-bar-container">
        <button id="plan-button" onClick={planMeals}>
          Plan {days} days!
        </button>
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
        <RecipeTypeSelector setOutput={handleMealType} />
      </div>
    </MuiPickersUtilsProvider>
  );
}
