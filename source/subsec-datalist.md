## Datalist

Select menus are a good way to avoid data entry errors by users. When ordering a t-shirt that 
comes in a variety of colors, it's nice to give them a menu, so that your form-processing software doesn't have to deal with people choosing a t-shirt in "blu" or "greem" because of a simple typo.

Similarly, you might want someone to enter their birth year, but you don't want to get "961" or "196" because of a typo. 
But a drop-down menu of all the plausible birth years for your users is tedious and annoying. 
Very long menus for other common questions, such as your state and country, are equally annoying. 
A better approach is to use a text input, but provide the browser with a list of the desired values. 
Here is an example:

```htmla
<p><label> state: <input type="text" name="state" list="state_list"></label>
<datalist id="state_list">
<option value="Alabama"></option>
<option value="Alaska"></option>
<option value="Arizona"></option>
<option value="Arkansas"></option>
<option value="California"></option>
<option value="Colorado"></option>
<option value="Connecticut"></option>
<option value="Delaware"></option>
<option value="Florida"></option>
<option value="Georgia"></option>
<option value="Hawaii"></option>
<option value="Idaho"></option>
<option value="Illinois"></option>
<option value="Indiana"></option>
<option value="Iowa"></option>
<option value="Kansas"></option>
<option value="Kentucky"></option>
<option value="Louisiana"></option>
<option value="Maine"></option>
<option value="Maryland"></option>
<option value="Massachusetts"></option>
<option value="Michigan"></option>
<option value="Minnesota"></option>
<option value="Mississippi"></option>
<option value="Missouri"></option>
<option value="Montana"></option>
<option value="Nebraska"></option>
<option value="Nevada"></option>
<option value="New Hampshire"></option>
<option value="New Jersey"></option>
<option value="New Mexico"></option>
<option value="New York"></option>
<option value="North Carolina"></option>
<option value="North Dakota"></option>
<option value="Ohio"></option>
<option value="Oklahoma"></option>
<option value="Oregon"></option>
<option value="Pennsylvania"></option>
<option value="Rhode Island"></option>
<option value="South Carolina"></option>
<option value="South Dakota"></option>
<option value="Tennessee"></option>
<option value="Texas"></option>
<option value="Utah"></option>
<option value="Vermont"></option>
<option value="Virginia"></option>
<option value="Washington"></option>
<option value="West Virginia"></option>
<option value="Wisconsin"></option>
<option value="Wyoming"></option>
</datalist>
```

This gives some of the abilities of select menu, but it allows the user to type a few letters and then
choose from the remaining options. Try typing a "v" in the form above: you should then have a choice of Vermont and Virginia (along with Nevada, Pennsylvania and West Virginia). Typing "ve" narrows the choices to just Vermont.

One downside to using datalist is that it is not fully supported by all browsers, though it does work on most
of them. Another is that it's possible for the user to override the given options and insert a bogus value. Try inserting "confusion" in the state box above. So, the form processing software will still
need to check the value, though it should do that anyway.

For birth years, you can make use of `max` and `min`:

```htmla
<form method="get" action="/assignment/echoform">
<p><label>birth year: <input type="number" min="1900" max="2026"></label>
<p><button type="submit">report age</button>
</form>
```


