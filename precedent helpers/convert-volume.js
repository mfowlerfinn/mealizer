

{/* <select name="ccfromval" id="ccfromval">
<option>Drop</option>
<option>Dash</option>
<option>Pinch</option>
<option>Milliliters/cc </option>
<option>Deciliter</option>
<option>Fluid Dram</option>
<option>Teaspoon (US)</option>
<option>Teaspoon (UK)</option>
<option>Tablespoon (US)</option>
<option>Tablespoon (UK)</option>
<option>Fluid Ounce (US)</option>
<option>Fluid Ounce (Imperial)</option>
<option>Cups </option>
<option>Cubic Inch</option>
<option>Gill (US) </option>
<option>Gill (UK) </option>
<option>Pint (US) </option>
<option>Pint (UK) </option>
<option>Quarts (US)</option>
<option>Liters </option>
<option>Gallons (US)</option>
<option>Gallons (UK)</option>
</select>

<select name="cctoval" id="cctoval">
<option>Drop</option>
<option>Dash</option>
<option>Pinch</option>
<option>Milliliters/cc </option>
<option>Deciliter</option>
<option>Fluid Dram</option>
<option>Teaspoon (US)</option>
<option>Teaspoon (UK)</option>
<option>Tablespoon (US)</option>
<option>Tablespoon (UK)</option>
<option>Fluid Ounce (US)</option>
<option>Fluid Ounce (Imperial)</option>
<option>Cups </option>
<option>Cubic Inch</option>
<option>Gill (US) </option>
<option>Gill (UK) </option>
<option>Pint (US) </option>
<option>Pint (UK) </option>
<option>Quarts (US)</option>
<option>Liters </option>
<option>Gallons (US)</option>
<option>Gallons (UK)</option>
</select> */}



    function calculate() {

        var from = parseInt(document.getElementById("ccfromval").selectedIndex);
        var toval = parseInt(document.getElementById("cctoval").selectedIndex);
        var input = parseInt(document.getElementById("ccinput").value);
        var output = 0;
        var x = 0;

        if (from == 0) { x = input * .00006485423519737; }
        if (from == 1) { x = input * .0003080576; }
        if (from == 2) { x = input * .0006161152; }
        if (from == 3) { x = input * .001; }
        if (from == 4) { x = input * .1; }
        if (from == 5) { x = input * .0036966914; }
        if (from == 6) { x = input * .004927469540511968; }
        if (from == 7) { x = input * .0046207343; }
        if (from == 8) { x = input * .014782408621535903; }
        if (from == 9) { x = input * .018482937; }
        if (from == 10) { x = input * .029564817243071806; }
        if (from == 11) { x = input * .028413075; }
        if (from == 12) { x = input * .23651853794457445; }
        if (from == 13) { x = input * .01638706; }
        if (from == 14) { x = input * .11825926897228722; }
        if (from == 15) { x = input * .1420654; }
        if (from == 16) { x = input * .4730370758891489; }
        if (from == 17) { x = input * .5682615; }
        if (from == 18) { x = input * .9460741517782978; }
        if (from == 19) { x = input * 1; }
        if (from == 20) { x = input * 3.784296607113191; }
        if (from == 21) { x = input * 4.546092; }

        if (toval == 0) { output = x / .00006485423519737; }
        if (toval == 1) { output = x / .0003080576; }
        if (toval == 2) { output = x / .0006161152; }
        if (toval == 3) { output = x / .001; }
        if (toval == 4) { output = x / .1; }
        if (toval == 5) { output = x / .0036966914; }
        if (toval == 6) { output = x / .004927469540511968; }
        if (toval == 7) { output = x / .0046207343; }
        if (toval == 8) { output = x / .014782408621535903; }
        if (toval == 9) { output = x / .018482937; }
        if (toval == 10) { output = x / .029564817243071806; }
        if (toval == 11) { output = x / .028413075; }
        if (toval == 12) { output = x / .23651853794457445; }
        if (toval == 13) { output = x / .01638706; }
        if (toval == 14) { output = x / .11825926897228722; }
        if (toval == 15) { output = x / .1420654; }
        if (toval == 16) { output = x / .4730370758891489; }
        if (toval == 17) { output = x / .5682615; }
        if (toval == 18) { output = x / .9460741517782978; }
        if (toval == 19) { output = x / 1; }
        if (toval == 20) { output = x / 3.784296607113191; }
        if (toval == 21) { output = x / 4.546092; }

        document.getElementById("ccoutput").value = Math.round(1000 * output) / 1000;
        return true;
    }
