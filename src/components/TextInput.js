import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useGlobalState } from "../context/LocalState";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 100
    }
  }
}));

export default function TextInput() {
  const classes = useStyles();

  const { options, setOptions } = useGlobalState();

  const [servings, setServings] = React.useState(options.servings);

  const handleChange = event => {
    setServings(event.target.value);
  };

  useEffect(() => {
    if (!isNaN(servings)) {
      if (servings >= 1) {
        let num = parseFloat(servings);
        setOptions({ servings: num });
      }
    }
  }, [servings]);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="servings"
        label="Servings"
        value={servings}
        onChange={handleChange}
      />
    </form>
  );
}
