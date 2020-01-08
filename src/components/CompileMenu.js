import React, {
  Fragment,
  useState,
  useEffect,
  useRef
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControlLabel } from "@material-ui/core";

//get options previously selected... allow set to "default for user"
//show options to compile menu but deprioritize them (opt-in)
//let user set options if desired (opt-in) (# of days, recipe blacklist, ) + (meals per day, meal composition, recipe repo)
//on submit => gather options, show progress, run recipe sorting functions, display list of new menu, allow editing(re-run, re-set options, manually arrange, deselect days, move to recipe blacklist, add to recipe favorites?)
//when happy, "confirm" menu => sets menu in state, compiles grocery list, pushes to ical?

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: 20
  },
  title: {
    fontSize: 16
  },
  content: {},
  day: {
    paddingTop: 15,
    marginLeft: 20,
    display: "inline-block"
  },
  pos: {
    marginBottom: 12
  },
  formControl: {
    margin: 1,
    minWidth: 120
  },
  hide: {
    display: "none"
  }
});

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function setDefaultState(day, days) {
  let storeObj = {};
  for (let i = 0; i < days; i++) {
    let key = day + i;
    // console.log(key);
    storeObj[key] = true;
  }
  // console.log(storeObj);
  return storeObj;
}

export default function CompileMenu() {
  const handleChange = e => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  let day = new Date().getDay();
  let dayString = weekday[day];
  let recipeCards = [];
  let days = 7;
  let startDay;
  let servings = 2;
  // setDefaultState(day, days);

  const [checked, setChecked] = useState();
  const classes = useStyles();

  useEffect(() => {
    // console.log(checked);
  }, [checked]);

  useEffect(() => {
    //runs once since empty array, acts like componentDidMount
    setChecked(setDefaultState(day, days));
  }, []);

  for (let i = 0; i < days; i++) {
    let dayKey = day + i;
    let dayNum = dayKey % 7;
    dayString = weekday[dayNum];
    // console.log({dayNum, dayString});

    recipeCards.push(
      <Card key={dayKey} className={classes.card}>
        <CardContent className={classes.content}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                name={`${dayKey}`}
                color="primary"
                onChange={handleChange}
              />
            }
            label={dayString}
          />
          <div className={checked && checked[dayKey] ? null : classes.hide}>
            {/* {(checked) && (checked[dayKey]) ? null : display: none} */}
            <Typography variant="h6" component="h2">
              meal title
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              w/ some side(s)
            </Typography>
            <Typography variant="body2" component="p">
              brief description of meal
            </Typography>
            <Typography color="textSecondary">estimated time</Typography>
          </div>
        </CardContent>
        {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
      </Card>
    );
  }

  return <Fragment>{recipeCards}</Fragment>;
}
