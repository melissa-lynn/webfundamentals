## Select Menus

One common feature of a web form is a menu of options, such as "red," "green" or "blue" for t-shirt colors, or the size of a pizza, as we saw in the first example. 
When the data will be processed by a computer, it's far better to have the user choose from among the known options than to try have them guess what values the software is expecting: "medium"? "regular"? "extra-large"? "XL"? 
Let's return to the pizza example:

```htmla
  <p><label for="select_size">Size:</label>
      <select id="select_size" name="size">
        <option value="">choose size</option>
        <option value="small">small (10-inch)</option>
        <option value="medium">medium (12-inch)</option>
        <option value="large">large (14-inch)</option>
      </select></p>
```


First, notice that we need to create a label for the input, as always. Here, we use the `for/in` technique, since the validator prefers that. Second, the menu options are given, using the `option` tag for each one. The `option` tag has an `value` attribute which is the value that will actually be submitted with the form data, which can be different from the options that the user *sees*. 

The `value` attribute is *optional*. If it's omitted, the value is the string between the start and end `option` tags. For example, if we omitted `value="small"`, the value would be `small (10-inch)`. That might be fine, depending on the software that will be processing the form, but often we choose a simple, compact internal representation and show the user a more descriptive string. But if the value is already simple and compact, there's no reason to be verbose:

```html
<select name="color">
  <option>red</option>
  <option>blue</option>
</select>
```

Another thing to note is that the pizza form used a "throw-away" first option whose `value` is the empty string and the visible option is some text like "choose one" or "select option". This alerts the user that they have not yet made a choice.

