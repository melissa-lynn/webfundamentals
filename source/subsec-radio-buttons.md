## Radio Buttons and Checkboxes

Radio buttons are used for a set of *mutually exclusive* options, like
the buttons on a car radio, to choose the station. 

**Important:** Radio input items must all have the same *name*, so
that they are considered as related. Without the same name, radio
buttons will not be mutually exclusive.

Let's re-do the way that the user chooses the size of the pizza, this time using
radio buttons:

```htmla
  <fieldset>
      <legend>Choose pizza size</legend>
      <p>
          <input id="size_small" type="radio" name="size" value="small">
          <label for="size_small">small (10-inch)</label>

      <p>
          <input id="size_medium" type="radio" name="size" value="medium">
          <label for="size_medium">medium (12-inch)</label>

      <p>
          <input id="size_large" type="radio" name="size" value="large">
          <label for="size_large">large (14-inch)</label>
  </fieldset>
```

This is a lot more complicated, but let's take it one step at a time. Notice that:

* all the inputs are of `type=radio`. That creates the little circle widget that you use to choose that value
* all the inputs have the same `name`, here it's `name=size` just like with the `select` menu (so our form-processing code need not change)
* all the inputs have a label using the `for/in` technique. Here, the label helps everyone, because now we can click on the label to choose an option instead of having to click on the little circle widget. 

Two new tags are the `fieldset` and `legend`. The `fieldset` is a container for the entire radio button group and associates the `legend` with the group. 
The `legend` is a kind of caption or label for the group. 
If someone using assistive technology wants to know the label for a radio button, that's a value like "large (14-inch)", but the `legend` answers the question about what it's the size *of*.

Since we can use either menus (using `select`) or radio buttons for a set of mutually exclusive choices, it makes sense to ask when to use each. 
Here are some reasonable guidelines:

* Use radio buttons when there are only a few options and you want the user to easily see all of them. In a mobile environment, the user probably only has to tap once to choose, while a menu would require several. Screen readers will typically say the legend and the label of the current option along with the number of options, such as "Choose pizza size, large (14-in) chosen, 1 of 3", which is clear and accessible.
* Use menus when there are lots of options so that screen space becomes an issue (for example, majors/departments at a college). Screen readers typically say the label and the fact that the input is collapsed (such as "choose pizza size, combo box, collapsed"), so the user has to open it to hear the options.

Given those considerations, we probably should use radio buttons for the pizza size.

An input that is similar to radio buttons are checkboxes, with the primary difference being that with checkboxes you can choose more than one, so they are not mutually exclusive. 
Let's see how we might do that for pizza toppings:

```htmla
  <fieldset>
      <legend>pizza toppings</legend>
      <p>
          <input id="top_olives" type="checkbox" name="topping" value="olives">
          <label for="top_olives">Calamata olives</label>
      <p>
          <input id="top_mushrooms" type="checkbox" name="topping" value="mushrooms">
          <label for="top_mushrooms">button mushrooms</label>
      <p>
          <input id="top_onions" type="checkbox" name="topping" value="onions">
          <label for="top_onions">grilled onions</label>
      <p>
          <input id="top_anchovies" type="checkbox" name="topping" value="anchovies">
          <label for="top_anchovies">anchovies</label>

  </fieldset>
```

As you can see, this is a pretty straightforward variation on radio buttons. We change to `type="checkbox"`, but everything else
is the same: they all share the same `name` attribute, and there's a `legend` and a surrounding `fieldset`. Again, we were 
a little more descriptive in the `label` than in the `value`. 

Note that it's not uncommon to have a checkbox group with only one checkbox in it, for the equivalent of a yes/no question.
In the example below, we ask the user to join our mailing list, and we'll even nudge them in that direction by pre-selecting 
the checkbox. (You can add the `checked` attribute to any checkbox or radio button, if you want to have them on by default.)

```htmla
  <input id="join" name="join" type="checkbox" checked>
  <label for="join">join our mailing list</label>
  ```

  In this case, since there is only one checkbox in the group, there's no need for `fieldset/legend`. 
  Sometimes, there's a bit more context you can add using `fieldset/legend`:

  ```htmla
  <fieldset>
  <legend>Marketing preferences</legend>

  <label>
    <input type="checkbox" name="email">
    Receive email updates
  </label>
</fieldset>
```

But in many cases, you should consider using radio buttons for yes/no choices:

```htmla
<fieldset>
    <legend>join our mailing list</legend>
    <label><input type="radio" name="mailing_list" value="yes">yes</label>
    <label><input type="radio" name="mailing_list" value="no">no</label>
</fieldset>
```

Here we used the structural approach to labeling the buttons, rather than `for/id`.


